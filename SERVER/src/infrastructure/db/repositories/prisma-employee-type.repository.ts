import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';

@Injectable()
export class PrismaEmployeeTypeRepository implements EmployeeTypeRepository {
  private readonly logger = new Logger(PrismaEmployeeTypeRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(employeeType: EmployeeType): Promise<EmployeeType> {
    this.logger.log(`Criando tipo de funcionário no banco: ${employeeType.name}`);
    try {
      const created = await this.prismaService.employeeType.create({
        data: {
          name: employeeType.name,
        },
      });
      this.logger.log(`Tipo de funcionário criado com sucesso: ${JSON.stringify(created)}`);
      return new EmployeeType({
        id: created.id,
        name: created.name,
      });
    } catch (error) {
      this.logger.error(`Erro ao criar tipo de funcionário no banco: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<EmployeeType[]> {
    this.logger.log('Buscando todos os tipos de funcionário no banco');
    try {
      const employeeTypes = await this.prismaService.employeeType.findMany();
      this.logger.log(`Encontrados ${employeeTypes.length} tipos de funcionário no banco`);
      
      // Garantir que os dados estão sendo mapeados corretamente
      const mapped = employeeTypes.map(
        (employeeType) => {
          const result = new EmployeeType({
            id: employeeType.id,
            name: employeeType.name,
          });
          return result;
        }
      );
      
      this.logger.debug(`Dados mapeados: ${JSON.stringify(mapped)}`);
      return mapped;
    } catch (error) {
      this.logger.error(`Erro ao buscar tipos de funcionário no banco: ${error.message}`, error.stack);
      return []; // Retorna array vazio em caso de erro para evitar quebra da aplicação
    }
  }

  async findById(id: string): Promise<EmployeeType | null> {
    this.logger.log(`Buscando tipo de funcionário por ID: ${id}`);
    try {
      const employeeType = await this.prismaService.employeeType.findUnique({
        where: { id },
      });
      if (!employeeType) {
        this.logger.log(`Nenhum tipo de funcionário encontrado com o ID: ${id}`);
        return null;
      }
      return new EmployeeType({
        id: employeeType.id,
        name: employeeType.name,
      });
    } catch (error) {
      this.logger.error(`Erro ao buscar tipo de funcionário por ID: ${error.message}`, error.stack);
      return null;
    }
  }

  async findByName(name: string): Promise<EmployeeType | null> {
    this.logger.log(`Buscando tipo de funcionário por nome: ${name}`);
    try {
      const employeeType = await this.prismaService.employeeType.findFirst({
        where: { name },
      });
      if (!employeeType) {
        this.logger.log(`Nenhum tipo de funcionário encontrado com o nome: ${name}`);
        return null;
      }
      return new EmployeeType({
        id: employeeType.id,
        name: employeeType.name,
      });
    } catch (error) {
      this.logger.error(`Erro ao buscar tipo de funcionário por nome: ${error.message}`, error.stack);
      return null;
    }
  }
} 