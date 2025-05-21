import { PrismaClient } from '@prisma/client';

async function syncUserTypes() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Iniciando sincronização de usuários Admin e Employee...');
    
    // Sincronizar usuários Admin
    await syncAdminUsers(prisma);
    
    // Sincronizar usuários Employee
    await syncEmployeeUsers(prisma);
    
    console.log('Sincronização de usuários concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a sincronização:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function syncAdminUsers(prisma: PrismaClient) {
  try {
    console.log('Sincronizando usuários Admin...');
    
    // Buscar o tipo Admin pelo nome
    const adminType = await prisma.type.findFirst({
      where: { name: 'Admin' }
    });
    
    if (!adminType) {
      console.error('Tipo "Admin" não encontrado no banco de dados.');
      return;
    }
    
    // Buscar todos os usuários com tipo Admin
    const adminUsers = await prisma.user.findMany({
      where: { 
        typeId: adminType.id,
        active: true
      }
    });
    
    console.log(`Encontrados ${adminUsers.length} usuários com tipo Admin.`);
    
    // Para cada usuário, verificar se existe registro na tabela Admin
    for (const user of adminUsers) {
      const existingAdmin = await prisma.admin.findUnique({
        where: { Cpf: user.cpf }
      });
      
      if (!existingAdmin) {
        // Criar registro na tabela Admin
        await prisma.admin.create({
          data: {
            Cpf: user.cpf,
            name: user.name,
            typeId: adminType.id
          }
        });
        console.log(`Criado registro de Admin para usuário ${user.name} (CPF: ${user.cpf})`);
      } else {
        console.log(`Usuário ${user.name} (CPF: ${user.cpf}) já possui registro de Admin.`);
      }
    }
    
    console.log('Sincronização de usuários Admin concluída.');
  } catch (error) {
    console.error('Erro durante a sincronização de Admin:', error);
  }
}

async function syncEmployeeUsers(prisma: PrismaClient) {
  try {
    console.log('Sincronizando usuários Employee...');
    
    // Buscar o tipo Employee pelo nome
    const employeeType = await prisma.type.findFirst({
      where: { name: 'Employee' }
    });
    
    if (!employeeType) {
      console.error('Tipo "Employee" não encontrado no banco de dados.');
      return;
    }
    
    // Buscar um tipo de funcionário padrão
    const defaultEmployeeType = await prisma.employeeType.findFirst();
    
    if (!defaultEmployeeType) {
      console.error('Não foi possível encontrar um EmployeeType padrão para o funcionário');
      return;
    }
    
    // Buscar todos os usuários com tipo Employee
    const employeeUsers = await prisma.user.findMany({
      where: { 
        typeId: employeeType.id,
        active: true
      }
    });
    
    console.log(`Encontrados ${employeeUsers.length} usuários com tipo Employee.`);
    
    // Para cada usuário, verificar se existe registro na tabela Employee
    for (const user of employeeUsers) {
      const existingEmployee = await prisma.employee.findUnique({
        where: { cpf: user.cpf }
      });
      
      if (!existingEmployee) {
        // Criar registro na tabela Employee
        await prisma.employee.create({
          data: {
            cpf: user.cpf,
            name: user.name,
            typeId: employeeType.id,
            employeeTypeId: defaultEmployeeType.id
          }
        });
        console.log(`Criado registro de Employee para usuário ${user.name} (CPF: ${user.cpf})`);
      } else {
        console.log(`Usuário ${user.name} (CPF: ${user.cpf}) já possui registro de Employee.`);
      }
    }
    
    console.log('Sincronização de usuários Employee concluída.');
  } catch (error) {
    console.error('Erro durante a sincronização de Employee:', error);
  }
}

// Executar o script se chamado diretamente
if (require.main === module) {
  syncUserTypes()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Erro fatal durante execução do script:', error);
      process.exit(1);
    });
}

export default syncUserTypes; 