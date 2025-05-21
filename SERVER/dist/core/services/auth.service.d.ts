import { PrismaService } from 'src/core/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly configService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    Login(login: any): Promise<any>;
    private gerarTokenPaciente;
    private gerarTokenUsuario;
    private gerarTokenAdmin;
}
