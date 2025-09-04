import { AuthService } from 'src/core/services/auth.service';
import { Response } from 'express';
declare class LoginDto {
    identifier: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Response<any, Record<string, any>>;
    getProfile(req: any): {
        cpf: any;
        tipos: any;
        name: any;
        iat: any;
        exp: any;
        companyId: any;
    };
}
export {};
