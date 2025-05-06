import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { Company } from 'src/domain/entities/company';
import { UniqueEntityCnpj } from 'src/core/entities/unique-entity-cnpj';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(company: Company): Promise<Company> {
    try {
      const created = await this.prismaService.company.create({
        data: {
          Cnpj: company.cnpj,
          name: company.name,
          phone: company.phone,
          email: company.email,
        },
      });
      return new Company({
        cnpj: new UniqueEntityCnpj(created.Cnpj),
        name: created.name,
        phone: created.phone,
        email: created.email,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = error.meta?.target;
        if (Array.isArray(target)) {
          if (target.includes('Cnpj')) {
            throw new ConflictException('CNPJ já cadastrado.');
          }
          if (target.includes('email')) {
            throw new ConflictException('E-mail já cadastrado.');
          }
        } else if (typeof target === 'string') {
          if (target.includes('Cnpj')) {
            throw new ConflictException('CNPJ já cadastrado.');
          }
          if (target.includes('email')) {
            throw new ConflictException('E-mail já cadastrado.');
          }
        }
        throw new ConflictException('CNPJ ou e-mail já cadastrado.');
      }
      throw error;
    }
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

  async update(Cnpj: string, data: Partial<Company>): Promise<Company> {
    const updatedCompany = await this.prismaService.company.update({
      where: { Cnpj },
      data,
    });

    return new Company({
      name: updatedCompany.name,
      cnpj: new UniqueEntityCnpj(updatedCompany.Cnpj),
      email: updatedCompany.email,
      phone: updatedCompany.phone,
    });
  }

  async findByName(name: string): Promise<Company | null> {
    const company = await this.prismaService.company.findFirst({
      where: { name },
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
