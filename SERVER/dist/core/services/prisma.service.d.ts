import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import Login from 'src/domain/entities/login';
import { UserData } from 'src/domain/entities/user';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    Login: Login;
    User: UserData;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
