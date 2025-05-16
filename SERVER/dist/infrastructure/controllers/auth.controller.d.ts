import { AuthService } from 'src/core/services/auth.service';
import { LoginProps } from 'src/domain/entities/login';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginProps: LoginProps, res: Response): Promise<Response<any, Record<string, any>>>;
    loginPatient(loginProps: LoginProps): Promise<any>;
    logout(res: Response): Response<any, Record<string, any>>;
}
