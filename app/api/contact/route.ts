import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// POST /api/contact
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Transport config from environment variables
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || `no-reply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}`;

    console.log({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    });

    // Validate that required SMTP env vars exist and report which are missing (without revealing values).
    const required = [
      ['SMTP_HOST', host],
      ['SMTP_PORT', port],
      ['SMTP_USER', user],
      ['SMTP_PASS', pass],
    ];
    const missing = required.filter(([, v]) => v === undefined || v === null || v === '').map(([k]) => k);
    if (missing.length > 0) {
      return NextResponse.json({ error: `SMTP not configured. Missing: ${missing.join(', ')}` }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `${name} <${from}>`,
      to: 'Somebosnian@gmail.com',
      subject: `Website inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Contact API error:', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message || 'Unknown error' }, { status: 500 });
  }
}
