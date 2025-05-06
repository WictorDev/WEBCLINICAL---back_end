import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { TypeController } from '../controllers/type.controller';
import { PrismaTypeRepository } from '../db/repositories/prisma-type.repository';
import { CreateTypeUseCase } from 'src/use-case/type/create-type.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TypeController],
  providers: [
    {
      provide: TypeRepository,
      useClass: PrismaTypeRepository,
    },
    PrismaTypeRepository,
    CreateTypeUseCase
  ],
  exports: [
    TypeRepository,
    PrismaTypeRepository,
    CreateTypeUseCase
  ],
})
export class TypeModule {} 