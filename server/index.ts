import express from 'express';
import cors from 'cors';
import BetterSqlite3 from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// database setup
const db = new BetterSqlite3(process.env.DATABASE_URL || './data.sqlite');
db.prepare(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)'
).run();

// email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
});

function sendWelcomeEmail(email: string) {
  return transporter.sendMail({
    from: process.env.EMAIL_SMTP_USER,
    to: email,
    subject: 'Welcome to PersonaPath AI',
    text: 'Thank you for signing up!',
  });
}

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    stmt.run(email, hash);
    await sendWelcomeEmail(email).catch(() => {});
    res.json({ message: 'User created' });
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!email || !message) return res.status(400).json({ message: 'Email and message required' });
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SMTP_USER,
      to: email,
      subject: 'Thanks for contacting PersonaPath AI',
      text: `Hi ${name || ''}, we received your message: ${message}`,
    });
    res.json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.get('/api/ai-key', (_req, res) => {
  // for deployment, AI_API_KEY should be set in environment variables
  res.json({ key: process.env.AI_API_KEY || '' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
