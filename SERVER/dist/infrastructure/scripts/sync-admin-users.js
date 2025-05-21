"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function syncUserTypes() {
    const prisma = new client_1.PrismaClient();
    try {
        console.log('Iniciando sincronização de usuários Admin e Employee...');
        await syncAdminUsers(prisma);
        await syncEmployeeUsers(prisma);
        console.log('Sincronização de usuários concluída com sucesso!');
    }
    catch (error) {
        console.error('Erro durante a sincronização:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
async function syncAdminUsers(prisma) {
    try {
        console.log('Sincronizando usuários Admin...');
        const adminType = await prisma.type.findFirst({
            where: { name: 'Admin' }
        });
        if (!adminType) {
            console.error('Tipo "Admin" não encontrado no banco de dados.');
            return;
        }
        const adminUsers = await prisma.user.findMany({
            where: {
                typeId: adminType.id,
                active: true
            }
        });
        console.log(`Encontrados ${adminUsers.length} usuários com tipo Admin.`);
        for (const user of adminUsers) {
            const existingAdmin = await prisma.admin.findUnique({
                where: { Cpf: user.cpf }
            });
            if (!existingAdmin) {
                await prisma.admin.create({
                    data: {
                        Cpf: user.cpf,
                        name: user.name,
                        typeId: adminType.id
                    }
                });
                console.log(`Criado registro de Admin para usuário ${user.name} (CPF: ${user.cpf})`);
            }
            else {
                console.log(`Usuário ${user.name} (CPF: ${user.cpf}) já possui registro de Admin.`);
            }
        }
        console.log('Sincronização de usuários Admin concluída.');
    }
    catch (error) {
        console.error('Erro durante a sincronização de Admin:', error);
    }
}
async function syncEmployeeUsers(prisma) {
    try {
        console.log('Sincronizando usuários Employee...');
        const employeeType = await prisma.type.findFirst({
            where: { name: 'Employee' }
        });
        if (!employeeType) {
            console.error('Tipo "Employee" não encontrado no banco de dados.');
            return;
        }
        const defaultEmployeeType = await prisma.employeeType.findFirst();
        if (!defaultEmployeeType) {
            console.error('Não foi possível encontrar um EmployeeType padrão para o funcionário');
            return;
        }
        const employeeUsers = await prisma.user.findMany({
            where: {
                typeId: employeeType.id,
                active: true
            }
        });
        console.log(`Encontrados ${employeeUsers.length} usuários com tipo Employee.`);
        for (const user of employeeUsers) {
            const existingEmployee = await prisma.employee.findUnique({
                where: { cpf: user.cpf }
            });
            if (!existingEmployee) {
                await prisma.employee.create({
                    data: {
                        cpf: user.cpf,
                        name: user.name,
                        typeId: employeeType.id,
                        employeeTypeId: defaultEmployeeType.id
                    }
                });
                console.log(`Criado registro de Employee para usuário ${user.name} (CPF: ${user.cpf})`);
            }
            else {
                console.log(`Usuário ${user.name} (CPF: ${user.cpf}) já possui registro de Employee.`);
            }
        }
        console.log('Sincronização de usuários Employee concluída.');
    }
    catch (error) {
        console.error('Erro durante a sincronização de Employee:', error);
    }
}
if (require.main === module) {
    syncUserTypes()
        .then(() => process.exit(0))
        .catch((error) => {
        console.error('Erro fatal durante execução do script:', error);
        process.exit(1);
    });
}
exports.default = syncUserTypes;
//# sourceMappingURL=sync-admin-users.js.map