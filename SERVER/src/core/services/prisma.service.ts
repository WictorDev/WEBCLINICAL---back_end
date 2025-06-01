import {
    Global,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
  } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
import { Login } from 'src/domain/entities/login';
import { UserData } from 'src/domain/entities/user';
  
  @Global()
  @Injectable()
  export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
  {
    Login: Login;
    User: UserData;


    async onModuleInit() {
      await this.$connect();
    }
  
    async onModuleDestroy() {
      await this.$disconnect();
    }
  }