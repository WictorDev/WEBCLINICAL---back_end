import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPasswordRecoveryEmail(email: string, recoveryToken: string): Promise<void> {
    const recoveryLink = `${process.env.FRONTEND_URL}/recovery-password?token=${recoveryToken}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Recuperação de Senha - WebClinical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Recuperação de Senha</h2>
          <p>Olá!</p>
          <p>Você solicitou a recuperação de senha da sua conta no WebClinical.</p>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${recoveryLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Redefinir Senha
          </a>
          <p>Se você não solicitou esta recuperação, ignore este email.</p>
          <p>Este link expira em 1 hora.</p>
          <p>Atenciosamente,<br>Equipe WebClinical</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Erro ao enviar email: ${error.message}`);
    }
  }

  async sendPatientConfirmationEmail(email: string, confirmationToken: string): Promise<void> {
    const confirmationLink = `${process.env.FRONTEND_URL}/confirm-registration?token=${confirmationToken}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Confirme seu cadastro - WebClinical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Confirme seu cadastro</h2>
          <p>Olá!</p>
          <p>Obrigado por se cadastrar no WebClinical!</p>
          <p>Para concluir seu cadastro, clique no link abaixo:</p>
          <a href="${confirmationLink}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Confirmar Cadastro
          </a>
          <p>Se você não se cadastrou no WebClinical, ignore este email.</p>
          <p>Este link expira em 24 horas.</p>
          <p>Atenciosamente,<br>Equipe WebClinical</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Erro ao enviar email: ${error.message}`);
    }
  }
} 