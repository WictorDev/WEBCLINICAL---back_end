import { RequestPasswordRecoveryUseCase } from '../../use-case/patient/request-password-recovery.usecase';
import { RecoveryPasswordUseCase } from '../../use-case/patient/recovery-password.usecase';
import { JwtService } from '@nestjs/jwt';
export declare class PasswordRecoveryController {
    private readonly requestPasswordRecoveryUseCase;
    private readonly recoveryPasswordUseCase;
    private readonly jwtService;
    constructor(requestPasswordRecoveryUseCase: RequestPasswordRecoveryUseCase, recoveryPasswordUseCase: RecoveryPasswordUseCase, jwtService: JwtService);
    requestRecovery(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
