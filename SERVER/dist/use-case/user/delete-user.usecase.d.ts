import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";
import { TypeRepository } from "src/domain/repositories/type.repository";
import { DeleteAdminUseCase } from "../admin/delete-admin.usecase";
import { DeleteEmployeeUseCase } from "../employee/delete-employee.usecase";
export declare class DeleteUserUseCase {
    private userRepository;
    private typeRepository;
    private deleteAdminUseCase;
    private deleteEmployeeUseCase;
    constructor(userRepository: UserRepository, typeRepository: TypeRepository, deleteAdminUseCase: DeleteAdminUseCase, deleteEmployeeUseCase: DeleteEmployeeUseCase);
    execute(cpf: UniqueEntitycpf): Promise<void>;
    private removeFromSpecificTable;
}
