import { Global, Module } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module'; // Ajuste o caminho conforme sua estrutura
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from 'src/infrastructure/controllers/auth.controller';
import { PrismaService } from 'src/core/services/prisma.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';
import { Reflector } from '@nestjs/core';
import { JwtStrategy } from 'src/infrastructure/auth/jwt.strategy';

@Global()
@Module({
  imports: [
    PrismaModule, // Adicione esta importação
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
        },
      }),
    }),
  ],
  providers: [AuthService,PrismaService,JwtAuthGuard,Reflector,JwtStrategy],
  exports: [AuthService,JwtAuthGuard,JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}