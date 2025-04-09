import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Importante: precisamos exportar o PrismaService
})
export class PrismaModule {}