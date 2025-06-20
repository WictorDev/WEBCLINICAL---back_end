import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/core/services/email.service';
import { RequestPasswordRecoveryUseCase } from 'src/use-case/patient/request-password-recovery.usecase';
import { PasswordRecoveryController } from '../controllers/password-recovery.controller';
import { PatientModule } from './patient.module';

@Module({
  imports: [
    PatientModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PasswordRecoveryController],
  providers: [
    EmailService,
    RequestPasswordRecoveryUseCase,
  ],
  exports: [EmailService],
})
export class PasswordRecoveryModule {} 