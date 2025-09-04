export type AppRole = 'Admin' | 'Patient' | 'Psychologist';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: AppRole[]) => import("@nestjs/common").CustomDecorator<string>;
