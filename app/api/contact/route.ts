import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, message } = body;

    const projectTypeLabels: Record<string, string> = {
      industrial: 'Galpón Industrial',
      commercial: 'Local Comercial',
      logistics: 'Centro Logístico',
      other: 'Estructura Especial',
    };

    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: 'contacto@metalaustral.cl',
      replyTo: email,
      subject: `Nueva solicitud de presupuesto - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nueva Solicitud de Presupuesto</h1>
            <p style="color: #93c5fd; margin: 6px 0 0; font-size: 14px;">Metal Austral SpA — Formulario de Contacto</p>
          </div>
          
          <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Nombre</strong><br/>
                  <span style="color: #0f172a; font-size: 16px;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Email</strong><br/>
                  <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Teléfono</strong><br/>
                  <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Empresa</strong><br/>
                  <span style="color: #0f172a;">${company}</span>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Tipo de Proyecto</strong><br/>
                  <span style="color: #0f172a;">${projectTypeLabels[projectType] || projectType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Descripción</strong><br/>
                  <p style="color: #0f172a; margin: 8px 0 0; line-height: 1.6;">${message}</p>
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af; font-size: 13px;">
                Responde directamente a este email para contactar al cliente: <a href="mailto:${email}" style="color: #2563eb; font-weight: bold;">${email}</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, id: info.messageId });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}
