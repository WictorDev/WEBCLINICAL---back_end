import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { AdminController } from '../controllers/admin.controller';
import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { DeleteAdminUseCase } from 'src/use-case/admin/delete-admin.usecase';
import { AdminRepository } from 'src/domain/repositories/admin.repository';
import { TypeModule } from './type.module';
import { PrismaAdminRepository } from '../db/repositories/prisma-admin.repository';

@Module({
  imports: [PrismaModule, TypeModule],
  controllers: [AdminController],
  providers: [
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
    PrismaAdminRepository,
    CreateAdminUseCase,
    DeleteAdminUseCase,
  ],
  exports: [
    AdminRepository,
    PrismaAdminRepository,
    CreateAdminUseCase,
    DeleteAdminUseCase,
  ],
})
export class AdminModule {} 