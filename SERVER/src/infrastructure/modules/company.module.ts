import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';

import { CompanyController } from '../controllers/company.controller';
import { PrismaCompanyRepository } from '../db/repositories/prisma-company.repository';
import { CompanyRepository } from 'src/domain/repositories/company.repository';

import { CreateCompanyUseCase } from 'src/use-case/company/create-company.usecase';
import { FindCompanyByEmailUseCase } from 'src/use-case/company/findByEmail.usecase';
import { FindCompanyUseCase } from 'src/use-case/company/find-company.usecase';
import { FindCompanyByCnpjUseCase } from 'src/use-case/company/findByCnpj-company.usecase';
import { UpdateCompanyUseCase } from 'src/use-case/company/update-company.usecase';

@Module({
  imports: [
    PrismaModule, // Fornece o PrismaService para acessar o banco de dados.
    ConfigModule, // Habilita o uso do ConfigService para carregar variáveis de ambiente.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
        },
      }),
    }),
  ],
  controllers: [CompanyController],
  providers: [
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
    PrismaCompanyRepository,

    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    FindCompanyUseCase,
    FindCompanyByEmailUseCase,
    FindCompanyByCnpjUseCase
  ],
  exports: [
    CompanyRepository,
    PrismaCompanyRepository,
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    FindCompanyUseCase,
    FindCompanyByEmailUseCase,
  ],
})
export class CompanyModule {}
