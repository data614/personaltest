import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useI18n();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      setStatus(t('Message sent'));
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus(t('Failed to send'));
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-bold mb-6">{t('Contact Us')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder={t('Name')} value={name} onChange={e => setName(e.target.value)} />
          <Input type="email" placeholder={t('Email')} value={email} onChange={e => setEmail(e.target.value)} required />
          <Textarea placeholder={t('Message')} value={message} onChange={e => setMessage(e.target.value)} required />
          <Button type="submit">{t('Send')}</Button>
          {status && <p className="text-sm mt-2">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
