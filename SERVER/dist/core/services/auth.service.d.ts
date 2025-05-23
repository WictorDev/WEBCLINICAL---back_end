import { PrismaService } from 'src/core/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    login(loginData: {
        identifier: string;
        password: string;
    }): Promise<{
        token: string;
        tipos: any;
        nome: any;
        iat: number;
        exp: number;
        companyId: any;
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
