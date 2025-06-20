import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { RequestPasswordRecoveryUseCase } from '../../use-case/patient/request-password-recovery.usecase';
import { RecoveryPasswordUseCase } from '../../use-case/patient/recovery-password.usecase';
import { Public } from '../auth/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('password-recovery')
@Controller('/api/password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly requestPasswordRecoveryUseCase: RequestPasswordRecoveryUseCase,
    private readonly recoveryPasswordUseCase: RecoveryPasswordUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('request')
  @ApiOperation({ summary: 'Solicitar recuperação de senha' })
  @ApiResponse({ status: 200, description: 'Email de recuperação enviado' })
  @ApiResponse({ status: 404, description: 'Email não encontrado' })
  async requestRecovery(@Body() body: { email: string }) {
    await this.requestPasswordRecoveryUseCase.execute(body.email);
    return { message: 'Email de recuperação enviado com sucesso' };
  }

  @Public()
  @Post('reset')
  @ApiOperation({ summary: 'Redefinir senha com token' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso' })
  @ApiResponse({ status: 400, description: 'Token inválido ou expirado' })
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    try {
      // Verificar e decodificar o token
      const payload = this.jwtService.verify(body.token);
      
      // Verificar se é um token de recuperação de senha
      if (payload.type !== 'password-recovery') {
        throw new UnauthorizedException('Token inválido');
      }

      const email = payload.email;
      
      // Redefinir a senha
      await this.recoveryPasswordUseCase.execute(email, body.newPassword);
      return { message: 'Senha redefinida com sucesso' };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido');
      }
      throw error;
    }
  }
} 