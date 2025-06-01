import { Injectable } from '@nestjs/common';
import { PrismaTypeRepository } from 'src/infrastructure/db/repositories/prisma-type.repository';

@Injectable()
export class FindTypeUseCase {
  constructor(private readonly typeRepo: PrismaTypeRepository) {}

    execute(typeId: string) {
        return this.typeRepo.findById(typeId);
    }
}