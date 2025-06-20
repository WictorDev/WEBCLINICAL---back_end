import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from 'src/infrastructure/controllers/user.controller';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { PrismaUserRepository } from '../db/repositories/prisma-user.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { CreateUserUseCase } from 'src/use-case/user/create-user.usecase';
import { FindUserByCpfUseCase } from 'src/use-case/user/findByCpf-user.usecase';
import { FindUserByEmailUseCase } from 'src/use-case/user/findByEmail-user.usecase';
import { FindUserUseCase } from 'src/use-case/user/find-user.usecase';
import { UpdateUserUseCase } from 'src/use-case/user/update-user.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { PrismaTypeRepository } from '../db/repositories/prisma-type.repository';
import { FindAllUsersUseCase } from 'src/use-case/user/find-all-users.usecase';
import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { CreateEmployeeUseCase } from 'src/use-case/employee/create-employee.usecase';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { EmployeeModule } from './employee.module';
import { PatientModule } from './patient.module';
import { AdminModule } from './admin.module';
import { CreateFirstAdminUseCase } from 'src/use-case/user/create-first-admin.usecase';
import { TypeModule } from './type.module';
import { EmployeeTypeModule } from './employee-type.module';
import { PrismaEmployeeTypeRepository } from 'src/infrastructure/db/repositories/prisma-employee-type.repository';
import { PrismaEmployeeRepository } from 'src/infrastructure/db/repositories/prisma-employee.repository';
import { DeleteUserUseCase } from 'src/use-case/user/delete-user.usecase';
import { EmailService } from 'src/core/services/email.service';

@Module({
  imports: [
    PrismaModule, // fornece PrismaService
    ConfigModule, // necessário para que ConfigService funcione aqui
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    AdminModule,
    EmployeeModule,
    forwardRef(() => PatientModule),
    TypeModule,
    EmployeeTypeModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaUserRepository,
    {
      provide: TypeRepository,
      useClass: PrismaTypeRepository,
    },
    PrismaTypeRepository,
    {
      provide: 'EmployeeTypeRepository',
      useClass: PrismaEmployeeTypeRepository,
    },
    {
      provide: 'EmployeeRepository',
      useClass: PrismaEmployeeRepository,
    },
    // UseCases
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByCpfUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    FindAllUsersUseCase,
    CreateAdminUseCase,
    CreateEmployeeUseCase,
    CreatePatientUseCase,
    CreateFirstAdminUseCase,
    DeleteUserUseCase,
    // Services
    EmailService,
  ],
  exports: [
    // Exporta tudo que pode ser útil em outros módulos
    UserRepository,
    PrismaUserRepository,
    TypeRepository,
    PrismaTypeRepository,
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByCpfUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    FindAllUsersUseCase,
    CreateAdminUseCase,
    CreateEmployeeUseCase,
    CreatePatientUseCase,
    CreateFirstAdminUseCase,
    DeleteUserUseCase,
    EmailService,
  ],
})
export class UserModule {}
