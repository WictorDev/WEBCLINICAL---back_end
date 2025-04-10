import { Injectable } from '@nestjs/common';
import { Company } from 'src/domain/entities/company';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { UniqueEntityCnpj } from 'src/core/entities/unique-entity-cnpj';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(data: {
    name: string;
    cnpj: UniqueEntityCnpj;
    email: string;
    phone: string;
  }) {
    const company = new Company(data);
    return await this.companyRepository.create(company);
  }
}
