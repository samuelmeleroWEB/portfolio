import { useState } from 'react';
import type { FormEvent } from 'react';
import { siteConfig } from '../../data/config';
import type { Translate } from '../../data/workspace';

const { VITE_EMAILJS_SERVICE_ID: service, VITE_EMAILJS_TEMPLATE_ID: template, VITE_EMAILJS_PUBLIC_KEY: key } = import.meta.env;
const emailConfigured = Boolean(service && template && key);

export function ContactForm({ tr }: { tr: Translate }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'compose'>('idle');
  const [composeUrl, setComposeUrl] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (!String(fields.get('name')).trim() || !String(fields.get('message')).trim()) {
      setStatus('error');
      return;
    }

    const subject = tr('Contacto desde el portfolio', 'Contact from the portfolio');
    const body = String(fields.get('message')) + '\n\n' + fields.get('name') + ' · ' + fields.get('email');
    const url = 'mailto:' + siteConfig.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    setComposeUrl(url);
    if (!emailConfigured) {
      setStatus('compose');
      window.location.href = url;
      return;
    }

    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(service, template, form, key);
      form.reset();
      setStatus('sent');
      setComposeUrl('');
    } catch {
      setStatus('error');
    }
  }

  const message = {
    idle: '',
    sending: tr('Enviando mensaje…', 'Sending message…'),
    sent: tr('Mensaje enviado.', 'Message sent.'),
    error: tr('No se pudo enviar. Revisa los campos o abre tu aplicación de correo.', 'Could not send. Check the fields or open your email app.'),
    compose: tr('Envía el borrador desde tu aplicación de correo.', 'Send the draft from your email app.'),
  }[status];

  return (
    <form className="contact-form" onSubmit={submit} onInput={() => {
      if (status !== 'idle' && status !== 'sending') { setStatus('idle'); setComposeUrl(''); }
    }}>
      <fieldset disabled={status === 'sending'}>
        <label>{tr('Nombre', 'Name')}<input required name="name" autoComplete="name" maxLength={120} pattern=".*\S.*" /></label>
        <label>{tr('Correo electrónico', 'Email address')}<input required name="email" type="email" autoComplete="email" maxLength={254} /></label>
        <label>{tr('Mensaje', 'Message')}<textarea required name="message" rows={4} maxLength={3000} /></label>
        <button type="submit" className="button button-dark">{emailConfigured ? tr('Enviar mensaje', 'Send message') : tr('Abrir borrador de correo', 'Open email draft')}</button>
      </fieldset>
      <div className="contact-feedback" role="status">{message}{composeUrl && (status === 'error' || status === 'compose') && <>{' '}<a href={composeUrl}>{tr('Abrir correo', 'Open email')}</a></>}</div>
    </form>
  );
}
