import { PrismaService } from 'src/core/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    login(login: any): Promise<any>;
    validateUser(email: string, password: string): Promise<any>;
}
