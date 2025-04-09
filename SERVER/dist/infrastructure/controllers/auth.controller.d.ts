import { AuthService } from 'src/core/services/auth.service';
import Login from 'src/domain/entities/login';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(login: Login): Promise<{
        accessToken: string;
    }>;
}
