import { Module } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { PrismaService } from 'src/core/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
