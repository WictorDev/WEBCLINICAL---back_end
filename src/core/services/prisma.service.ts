import {
    Global,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
  } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
  
  @Global()
  @Injectable()
  export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
  {
    Login: any;


    async onModuleInit() {
      await this.$connect();
    }
  
    async onModuleDestroy() {
      await this.$disconnect();
    }
  }