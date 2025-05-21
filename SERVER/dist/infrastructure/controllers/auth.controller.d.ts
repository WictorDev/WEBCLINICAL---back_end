import { AuthService } from 'src/core/services/auth.service';
import { LoginProps } from 'src/domain/entities/login';
import { Response } from 'express';
import { PrismaService } from 'src/core/services/prisma.service';
export declare class AuthController {
    private readonly authService;
    private readonly prismaService;
    constructor(authService: AuthService, prismaService: PrismaService);
    login(loginProps: LoginProps, res: Response): Promise<Response<any, Record<string, any>>>;
    loginPatient(loginProps: LoginProps, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    getMe(req: any): Promise<any>;
    testAuth(req: any, headers: any): Promise<{
        cookies: {
            token: string;
        };
        headers: {
            authorization: string;
        };
        message: string;
    }>;
}
