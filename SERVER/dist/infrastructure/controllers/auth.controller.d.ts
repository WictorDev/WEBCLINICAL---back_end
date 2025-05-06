import { AuthService } from 'src/core/services/auth.service';
import { LoginProps } from 'src/domain/entities/login';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginProps: LoginProps): Promise<{
        accessToken: string;
        userType: string;
    }>;
    loginPatient(loginProps: LoginProps): Promise<{
        accessToken: string;
        userType: string;
    }>;
}
