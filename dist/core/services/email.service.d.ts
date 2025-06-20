export declare class EmailService {
    private transporter;
    constructor();
    sendPasswordRecoveryEmail(email: string, recoveryToken: string): Promise<void>;
    sendPatientConfirmationEmail(email: string, confirmationToken: string): Promise<void>;
}
