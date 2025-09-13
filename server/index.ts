import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

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
