import { Module } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module'; // Ajuste o caminho conforme sua estrutura
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/infrastructure/controllers/auth.controller';
import { PrismaService } from 'src/core/services/prisma.service';

@Module({
  imports: [
    PrismaModule, // Adicione esta importação
    ConfigModule,
    JwtModule.register({
      // Suas configurações do JWT aqui
    }),
  ],
  providers: [AuthService,PrismaService,JwtService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}