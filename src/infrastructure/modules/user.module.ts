import { Module } from '@nestjs/common';
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


@Module({
  imports: [
    PrismaModule, // fornece PrismaService
    ConfigModule, // necessário para que ConfigService funcione aqui
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
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    // Repositório concreto
    PrismaUserRepository,

    // UseCases
    CreateUserUseCase,
    FindUserUseCase,
    
    FindUserByCpfUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    
  ],
  exports: [
    // Exporta tudo que pode ser útil em outros módulos
    UserRepository,
    PrismaUserRepository,

    CreateUserUseCase,
    FindUserUseCase,
    
    FindUserByCpfUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    
  ],
})
export class UserModule {}
