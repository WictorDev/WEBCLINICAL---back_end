import { PrismaService } from 'src/core/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import Login from 'src/domain/entities/login';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly configService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    Login(login: Login): Promise<{
        accessToken: string;
        userType: string;
    }>;
}
