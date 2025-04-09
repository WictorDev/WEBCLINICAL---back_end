import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from 'src/infrastructure/controllers/auth.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}