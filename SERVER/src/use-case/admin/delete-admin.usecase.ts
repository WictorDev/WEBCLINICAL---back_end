import { Injectable, BadRequestException } from '@nestjs/common';
import { AdminRepository } from 'src/domain/repositories/admin.repository';

@Injectable()
export class DeleteAdminUseCase {
    constructor(
        private readonly adminRepository: AdminRepository
    ) { }

    async execute(cpf: string): Promise<void> {
        const admin = await this.adminRepository.findByCpf(cpf);
        
        if (!admin) {
            throw new BadRequestException('Admin não encontrado.');
        }

        await this.adminRepository.delete(cpf);
    }
} 