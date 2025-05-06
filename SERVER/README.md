# WebClinical - Sistema de Gestão para Clínicas Médicas

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## 📋 Visão Geral

O WebClinical é um sistema de gestão para clínicas médicas desenvolvido com NestJS e Prisma ORM. Esta aplicação backend implementa funcionalidades essenciais como autenticação, gerenciamento de usuários, funcionários, tipos de acesso e empresas.

## 🚀 Requisitos

- Node.js (v16+)
- MySQL
- NPM ou Yarn

## ⚙️ Instalação e Configuração

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/webclinical.git
cd webclinical/SERVER
```

2. Instale as dependências
```bash
npm install
```

3. Configure o arquivo `.env` na raiz do projeto com suas variáveis de ambiente:
```
DATABASE_URL="mysql://usuario:senha@localhost:3306/webclinical"
JWT_SECRET="sua-chave-secreta"
```

4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

5. Inicie o servidor
```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:8080`

## 📚 Documentação da API

Depois de iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:8080/api
```

## 🔑 Fluxo de Criação de Usuário

Para criar um usuário no sistema WebClinical, é necessário seguir um fluxo específico, pois há dependências entre as entidades. Abaixo está o passo a passo completo:

### 1️⃣ Pré-requisitos

Antes de criar um usuário, é necessário que existam:
- Uma empresa (Company) cadastrada
- Um tipo de usuário (Type) cadastrado

### 2️⃣ Cadastro da Empresa

**Endpoint:** `POST /api/companies/create_company`

**Corpo da requisição:**
```json
{
  "cnpj": "99006876000102",
  "name": "Clínica São Lucas",
  "phone": "11999999999",
  "email": "contato@clinicasaolucas.com.br"
}
```

**Observações:**
- O CNPJ deve ser único no sistema
- O e-mail deve ser único no sistema
- Todos os campos são obrigatórios

### 3️⃣ Cadastro do Tipo de Usuário

**Endpoint:** `POST /api/types`

**Corpo da requisição:**
```json
{
  "name": "Adimin"
}
```

**Outros exemplos de tipos:**
```json
{
  "name": "Employee"
}
```

```json
{
  "name": "Patient"
}
```

### 4️⃣ Criação do Usuário

**Endpoint:** `POST /api/users/create_user`

**Corpo da requisição:**
```json
{
  "name": "Dr. João Silva",
  "cpf": "64883645029",
  "email": "joao.silva@clinicasaolucas.com.br",
  "password": "senha123",
  "companyId": "99006876000102",
  "type": "Adimin",
  "active": true
}
```

**Notas importantes:**
- O campo `companyId` deve ser o **CNPJ** da empresa já cadastrada
- O campo `type` deve ser o **nome** do tipo já cadastrado (não o UUID)
- CPF e e-mail devem ser únicos no sistema
- O sistema validará automaticamente se o tipo de usuário existe
- Se o tipo não existir, será retornado um erro: "Tipo de usuário não encontrado"

## 👨‍⚕️ Registro e Login de Pacientes

O sistema permite que pacientes se registrem e façam login para acessar funcionalidades específicas.

### 1️⃣ Pré-requisitos

Antes de registrar um paciente, é necessário que exista no sistema um **tipo chamado exatamente 'Patient'** (com P maiúsculo). Esse tipo é obrigatório e será atribuído automaticamente a todos os pacientes cadastrados.

> **Importante:** O campo `type` **não** deve ser enviado no corpo da requisição. O backend sempre usará o tipo padrão `Patient`.

### 2️⃣ Registro de Paciente

**Endpoint:** `POST /api/patients/register`

**Corpo da requisição:**
```json
{
  "cpf": "98765432100",
  "name": "Ana Paula Silva",
  "email": "ana.silva@email.com",
  "password": "senha123"
}
```

**Notas importantes:**
- O tipo do paciente será sempre o tipo padrão `Patient`.
- O tipo `Patient` deve existir previamente no sistema (crie via endpoint `/api/types` se necessário).
- O CPF e email devem ser únicos no sistema.
- A senha será automaticamente criptografada.
- Se o tipo `Patient` não existir, será retornado um erro: "Tipo padrão Patient não encontrado."

### 3️⃣ Login de Paciente

**Endpoint:** `POST /api/auth/login/patient`

**Corpo da requisição:**
```json
{
  "identifier": "98765432100",
  "password": "senha123"
}
```

ou

```json
{
  "identifier": "ana.silva@email.com",
  "password": "senha123"
}
```

**Notas importantes:**
- O campo `identifier` pode ser o CPF ou o email do paciente
- O sistema identificará automaticamente se é um CPF ou email
- Após autenticação bem-sucedida, será retornado um token JWT
- O token deve ser incluído nos cabeçalhos das requisições subsequentes

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userType": "patient"
}
```

### ✅ Validações

O sistema implementa as seguintes validações:

1. **CPF duplicado**:
   - A API retornará o status 400 (Bad Request) com a mensagem "CPF já cadastrado"

2. **E-mail duplicado**:
   - A API retornará o status 409 (Conflict) com a mensagem "E-mail já cadastrado"

3. **Tipo inexistente**:
   - A API retornará o status 400 (Bad Request) com a mensagem "Tipo não encontrado"

4. **Empresa inexistente**:
   - O usuário não será criado se a empresa não existir

### 🔒 Autenticação

Após criar um usuário, ele poderá se autenticar usando:

**Endpoint:** `POST /api/auth/login`

**Corpo da requisição:**
```json
{
  "identifier": "joao.silva@clinicasaolucas.com.br",
  "password": "senha123"
}
```

ou 

```json
{
  "identifier": "12345678900",
  "password": "senha123"
}
```

A API retornará um token JWT que deve ser usado em todas as requisições subsequentes como um cabeçalho de autorização:
```
Authorization: Bearer {token}
```

## 🧩 Outras Entidades Importantes

### EmployeeType (Tipo de Funcionário)

**Endpoint:** `POST /api/employee-types`
```json
{
  "name": "Médico"
}
```

### Employee (Funcionário)

**Endpoint:** `POST /api/employees`
```json
{
  "cpf": "12345678900",
  "name": "Maria da Silva",
  "advice": "CRM 12345",
  "type": "medico",
  "employeeType": "Urologista"
}
```

**Notas importantes:**
- O campo `type` deve ser o **nome** do tipo já cadastrado (não o UUID)
- O campo `employeeType` também deve ser o **nome** do tipo de funcionário já cadastrado
- O sistema validará se o tipo e o tipo de funcionário existem
- Se o tipo ou tipo de funcionário não existirem, será retornado um erro adequado
- O campo `advice` armazena registros profissionais como CRM, CRO, etc.

**Para atualizar um funcionário:**
**Endpoint:** `PUT /api/employees/{cpf}`
```json
{
  "name": "Maria da Silva Souza",
  "advice": "CRM 54321",
  "type": "enfermeiro",
  "employeeType": "Enfermeiro"
}
```

## 📊 Estrutura do Projeto

O projeto segue uma arquitetura limpa (Clean Architecture) com as seguintes camadas:

- **Domain**: Contém as entidades e interfaces de repositório
- **Use Cases**: Implementa a lógica de negócio
- **Infrastructure**: Contém implementações concretas, controllers e adaptadores
- **Core**: Serviços e utilitários compartilhados

## 📝 Observações Adicionais

- O sistema usa BCrypt para hash de senhas
- A autenticação é baseada em JWT (JSON Web Tokens)
- A documentação completa da API está disponível via Swagger
- O campo `active` em User pode ser usado para desativar usuários sem excluí-los

## 🚧 Troubleshooting

- **Erro de conexão com o banco de dados**: Verifique se as credenciais no .env estão corretas
- **Erro na criação de usuário**: Certifique-se de que a empresa e o tipo estão previamente cadastrados
- **Problema com CPF/CNPJ**: O sistema valida o formato do CPF/CNPJ, certifique-se de que estão no formato correto
- **Erro na criação de funcionário**: Certifique-se de que o tipo e o tipo de funcionário com os nomes informados existem no sistema
- **Erro no registro de paciente**: Verifique se o tipo informado existe e se o CPF/email não estão duplicados

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).