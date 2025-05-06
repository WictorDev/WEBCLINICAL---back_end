import { Injectable } from '@nestjs/common';
import { PrismaTypeRepository } from 'src/infrastructure/db/repositories/prisma-type.repository';
import { Type } from 'src/domain/entities/type';

@Injectable()
export class CreateTypeUseCase {
  constructor(private readonly typeRepo: PrismaTypeRepository) {}

  async execute(data: { name: string }) {
    const type = new Type({ id: '', name: data.name }); // id será gerado pelo Prisma
    return this.typeRepo.create(type);
  }
} 