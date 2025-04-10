import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { Company } from 'src/domain/entities/company';
import { UniqueEntityCnpj } from 'src/core/entities/unique-entity-cnpj';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(company: Company): Promise<Company> {
    const createdCompany = await this.prismaService.company.create({
      data: {
        name: company.name,
        Cnpj: company.cnpj,
        email: company.email,
        phone: company.phone,
      },
    });

    return new Company({
      name: createdCompany.name,
      cnpj: new UniqueEntityCnpj(createdCompany.Cnpj.toString()),
      email: createdCompany.email,
      phone: createdCompany.phone,
    });
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prismaService.company.findMany();

    return companies.map((company) => {
      return new Company({
        name: company.name,
        cnpj: new UniqueEntityCnpj(company.Cnpj),
        email: company.email,
        phone: company.phone,
      });
    });
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: { email }
    });

    if (!company) return null;

    return new Company({
      name: company.name,
      cnpj: new UniqueEntityCnpj(company.Cnpj),
      email: company.email,
      phone: company.phone,
    });
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: { Cnpj: cnpj }
    });

    if (!company) return null;

    return new Company({
      name: company.name,
      cnpj: new UniqueEntityCnpj(company.Cnpj),
      email: company.email,
      phone: company.phone,
    });
  }
}
