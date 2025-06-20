"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    transporter;
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
    async sendPasswordRecoveryEmail(email, recoveryToken) {
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
        }
        catch (error) {
            throw new Error(`Erro ao enviar email: ${error.message}`);
        }
    }
    async sendPatientConfirmationEmail(email, confirmationToken) {
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
        }
        catch (error) {
            throw new Error(`Erro ao enviar email: ${error.message}`);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map