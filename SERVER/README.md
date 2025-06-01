# WebClinical - Sistema de Gestão para Clínicas Médicas

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## 🚀 Tecnologias Utilizadas

### Dependências Principais
- NestJS: ^11.0.1
- Prisma ORM: ^6.5.0
- MySQL: 8.0
- TypeScript: ^5.7.3
- JWT: ^9.0.2
- Bcrypt: ^5.1.1

### Dependências de Desenvolvimento
- ESLint: ^9.18.0
- Prettier: ^3.4.2
- Jest: ^29.7.0
- Supertest: ^7.0.0

## 📋 Pré-requisitos

- Node.js 20+
- Docker (para o banco de dados)
- NPM ou Yarn

## 🔧 Instalação e Setup

### 1. Clone o repositório e instale as dependências

```bash
git clone https://github.com/seu-usuario/webclinical.git
cd webclinical/SERVER
npm install
```

### 2. Configuração do Banco de Dados MySQL com Docker

Execute o seguinte comando para iniciar um container MySQL:

```bash
docker run --name mysql-webclinical -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=webclinical -p 3306:3306 -d mysql:8.4.4
```

> Este comando cria um container MySQL com as seguintes configurações:
> - Nome: mysql-webclinical
> - Senha do root: root
> - Banco de dados: webclinical
> - Porta: 3306 (padrão)

### 3. Configure o arquivo .env

Crie um arquivo `.env` na raiz da pasta SERVER com o seguinte conteúdo:

```
DATABASE_URL="mysql://root:root@localhost:3306/webclinical?schema=public"
JWT_SECRET="seu-segredo-jwt-aqui"
```

### 4. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Documentação da API

Depois de iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api
```

## 🔐 Autenticação

O sistema utiliza JWT para autenticação. Todas as rotas (exceto login e registro) requerem um token válido no header:

```
Authorization: Bearer <token>
```

## 📋 Visão Geral da Arquitetura

O WebClinical segue os princípios da Clean Architecture, com separação clara entre:

- **Domain**: Entidades e interfaces de repositórios
- **Use Cases**: Regras de negócio da aplicação
- **Infrastructure**: Implementações concretas (controllers, repositories)

Esta arquitetura garante:
- Baixo acoplamento
- Alta testabilidade
- Facilidade de manutenção
- Independência de frameworks

## 📚 Estrutura de Módulos

```
src/
├── domain/           # Regras de negócio e entidades
│   ├── entities/     # Classes de domínio
│   └── repositories/ # Interfaces de repositório
├── use-case/         # Casos de uso da aplicação
├── infrastructure/   # Implementações concretas
│   ├── controllers/  # Controladores da API
│   ├── db/           # Implementações de repositórios
│   │   └── repositories/
│   ├── modules/      # Módulos NestJS
│   └── constants/    # Constantes (tokens de injeção)
└── main.ts          # Ponto de entrada da aplicação
```

## 🔑 Fluxo de Criação de Usuário

Para criar um usuário no sistema WebClinical, é necessário seguir um fluxo específico, pois há dependências entre as entidades. Abaixo está o passo a passo completo:

### 1️⃣ Pré-requisitos

Antes de criar um usuário, é necessário que existam:
- Uma empresa (Company) cadastrada - lembre-se de guardar o CNPJ da empresa, pois seu uso será crucial mais a frente
- Um tipo de usuário (Type) cadastrado

### 2️⃣ Cadastro da Empresa

**Endpoint:** `POST /api/companies/create_first_company`

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
- Esta rota só pode ser executada uma vez, na primeira criação do banco

### 3️⃣ Cadastro do Tipo de Usuário

**Endpoint:** `POST /api/types/create_initial_types`

**Corpo da requisição:**
```json
{
  "name": "ADMIN"
}
```

```json
{
  "name": "EMPLOYEE"
}
```

```json
{
  "name": "PATIENT"
}
```

**Observações:**
- Esta rota só pode ser executada uma vez, na primeira criação do banco
- Cria automaticamente os tipos ADMIN, EMPLOYEE e PATIENT

### 4️⃣ Criação do Usuário

**Endpoint:** `POST /api/users/create_first_admin`

**Corpo da requisição:**
```json
{
  "name": "Dr. João Silva",
  "cpf": "64883645029",
  "email": "joao.silva@clinicasaolucas.com.br",
  "password": "senha123",
  "companyId": "99006876000102",
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

Antes de registrar um paciente, é necessário que exista no sistema um **tipo chamado exatamente 'PATIENT'** (maiúsculo). Esse tipo é obrigatório e será atribuído automaticamente a todos os pacientes cadastrados.

> **Importante:** O campo `type` **não** deve ser enviado no corpo da requisição. O backend sempre usará o tipo padrão `PATIENT`.

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
- O tipo do paciente será sempre o tipo padrão `PATIENT`.
- O tipo `PATIENT` deve existir previamente no sistema (crie via endpoint `/api/types` se necessário).
- O CPF e email devem ser únicos no sistema.
- A senha será automaticamente criptografada.
- Se o tipo `PATIENT` não existir, será retornado um erro: "Tipo padrão PATIENT não encontrado."

### 3️⃣ Login de Paciente

**Endpoint:** `POST /api/auth/login`

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
  "userType": "PATIENT",
  "nome": "Ana Paula Silva" 
}
```

## 🧩 Outras Entidades Importantes

### EmployeeType (Tipo de Funcionário)

**Endpoint:** `POST /api/employee-types`
```json
{
  "name": "Médico"
}
```

### Employee (Funcionário)  AS

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
  "type": "Employee",
  "employeeType": "Enfermeiro"
}
```

## 🗓️ Novas Funcionalidades: Agendamentos e Consultas

O sistema agora inclui módulos para gerenciamento de agendas, agendamentos de consultas e prontuários médicos. Abaixo estão as principais rotas e exemplos de uso:

## 📅 Entendendo o Sistema de Agendamento

O sistema de agendamento do WebClinical foi projetado para facilitar o gerenciamento de horários e consultas médicas. Vamos entender como ele funciona:

### 🧑‍⚕️ Agendas dos Profissionais

Cada profissional (médico, enfermeiro, fisioterapeuta, etc.) possui uma agenda que define os dias e horários em que está disponível para atendimento. Por exemplo:

- **Dr. João**: Atende segundas e quartas, das 8h às 12h
- **Dra. Maria**: Atende terças e quintas, das 13h às 17h
- **Dr. Pedro**: Atende sextas, das 8h às 18h

Essas informações são cadastradas no sistema como "Schedules" (Agendas), definindo:
- O dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
- O horário de início do atendimento (ex: "08:00")
- O horário de término do atendimento (ex: "12:00")
- O profissional responsável (pelo CPF)

### 🕒 Como as Agendas Funcionam

1. **Definição de Disponibilidade**: Primeiro, os administradores ou os próprios profissionais cadastram seus horários de disponibilidade para cada dia da semana.

2. **Repetição Semanal**: Esses horários se repetem semanalmente. Por exemplo, se um médico atende às segundas-feiras das 8h às 12h, esse horário estará disponível em todas as segundas-feiras.

3. **Consulta de Disponibilidade**: Quando um paciente ou recepcionista deseja marcar uma consulta, o sistema mostra os horários disponíveis para o profissional selecionado.

4. **Verificação de Conflitos**: Ao tentar agendar uma consulta, o sistema verifica automaticamente se há conflitos de horário, garantindo que dois pacientes não sejam agendados no mesmo horário.

### 📌 Visualização Prática

**Exemplo: Agenda do Dr. João (Urologista)**

| Dia da Semana | Horário de Início | Horário de Término |
|---------------|-------------------|-------------------|
| Segunda-feira | 08:00             | 12:00             |
| Quarta-feira  | 08:00             | 12:00             |
| Sexta-feira   | 14:00             | 18:00             |

**Exemplo: Consultas Agendadas para Segunda-feira, 15/01/2024**

| Horário       | Paciente          | Status       |
|---------------|-------------------|--------------|
| 08:00 - 08:30 | Ana Silva         | CONFIRMADO   |
| 09:00 - 09:30 | Carlos Oliveira   | PENDENTE     |
| 10:00 - 10:30 | Maria Santos      | CONFIRMADO   |
| 11:00 - 11:30 | *Disponível*      | -            |

### 🧠 A Lógica por Trás do Sistema

1. **Agendas (Schedules)**: Definem os períodos gerais em que um profissional está disponível para atendimento em cada dia da semana.

2. **Agendamentos (Appointments)**: São reservas específicas de data e horário, dentro do período disponível na agenda, para atendimento de um paciente.

3. **Prontuários (Medical Records)**: São criados após a finalização de um atendimento, contendo informações sobre a consulta, como sintomas, diagnóstico e conduta.

4. **Prescrições (Prescriptions)**: Podem ser adicionadas aos prontuários, registrando medicações receitadas durante a consulta.

### 🚀 Vantagens do Sistema

- **Organização**: Evita conflitos de horários e overbooking
- **Eficiência**: Reduz tempo gasto com agendamento manual
- **Visibilidade**: Permite visualização rápida de horários disponíveis
- **Integração**: Todo o fluxo de atendimento está integrado, desde o agendamento até a prescrição

### 🕒 Agendas (Schedules)

As agendas definem os horários disponíveis para cada profissional.

#### Criar uma agenda para um profissional

**Endpoint:** `POST /schedules`  
**Autenticação:** Requer token JWT  
**Corpo da requisição:**

```json
{
  "dayOfWeek": 1,
  "startTime": "08:00",
  "endTime": "12:00",
  "employeeId": "12345678900"
}
```

> **Notas:**  
> - dayOfWeek: 0 (Domingo) até 6 (Sábado)  
> - startTime/endTime: Formato "HH:MM" (24h)  
> - employeeId: CPF do profissional

#### Consultar horários disponíveis

**Endpoint:** `GET /schedules/available?employeeId=12345678900&dayOfWeek=1`  
**Autenticação:** Requer token JWT

### 📅 Consultas (Appointments)

As consultas representam os agendamentos feitos para os horários disponíveis.

#### Criar um agendamento

**Endpoint:** `POST /appointments`  
**Autenticação:** Requer token JWT  
**Corpo da requisição:**

```json
{
  "date": "2023-12-10",
  "startTime": "09:00",
  "endTime": "09:30",
  "scheduleId": "c5c3b478-1b7f-4b9e-8c1d-7a3f8b4e9f0a",
  "patientId": "98765432100",
  "employeeId": "12345678900"
}
```

> **Notas:**  
> - date: Data da consulta (formato YYYY-MM-DD)  
> - scheduleId: ID da agenda relacionada  
> - patientId: CPF do paciente  
> - employeeId: CPF do profissional

#### Consultar agendamentos de um profissional

**Endpoint:** `GET /appointments/employee?employeeId=12345678900&date=2023-12-10`  
**Autenticação:** Requer token JWT

#### Atualizar status de um agendamento

**Endpoint:** `PATCH /appointments/{id}/status`  
**Autenticação:** Requer token JWT  
**Corpo da requisição:**

```json
{
  "status": "CONFIRMADO"
}
```

> **Status possíveis:**  
> - PENDENTE: Agendamento inicial  
> - CONFIRMADO: Agendamento confirmado pelo paciente/clínica  
> - FINALIZADO: Consulta concluída  
> - CANCELADO: Agendamento cancelado

#### Finalizar uma consulta e criar prontuário

**Endpoint:** `PATCH /appointments/{id}/finalize`  
**Autenticação:** Requer token JWT  
**Corpo da requisição:**

```json
{
  "symptoms": "Dor de cabeça e febre",
  "diagnosis": "Gripe",
  "conduct": "Repouso e medicação"
}
```

> **Importante:**  
> - Este endpoint só funciona para agendamentos com status "CONFIRMADO"  
> - Após finalizar, o status será alterado para "FINALIZADO"  
> - Um prontuário médico será criado automaticamente

### 🎬 Guia Passo a Passo de Agendamento para Recepcionistas

Vamos seguir um exemplo prático para ajudá-lo a entender como usar o sistema no dia a dia:

#### 1. Cadastrando a Agenda de um Novo Médico

Imagine que você precisa cadastrar os horários de atendimento da Dra. Laura, uma nova cardiologista que atenderá:
- Segundas e quartas, das 8h às 12h
- Sextas, das 14h às 18h

**Passo 1:** Envie uma requisição para cadastrar o horário de segunda-feira:
```json
// POST /schedules
{
  "dayOfWeek": 1,          // 1 = Segunda-feira
  "startTime": "08:00",    // Hora de início
  "endTime": "12:00",      // Hora de término
  "employeeId": "12345678900"  // CPF da Dra. Laura
}
```

**Passo 2:** Envie uma requisição para cadastrar o horário de quarta-feira:
```json
// POST /schedules
{
  "dayOfWeek": 3,          // 3 = Quarta-feira
  "startTime": "08:00",
  "endTime": "12:00",
  "employeeId": "12345678900"
}
```

**Passo 3:** Envie uma requisição para cadastrar o horário de sexta-feira:
```json
// POST /schedules
{
  "dayOfWeek": 5,          // 5 = Sexta-feira
  "startTime": "14:00",
  "endTime": "18:00",
  "employeeId": "12345678900"
}
```

#### 2. Marcando uma Consulta para um Paciente

Sr. Paulo ligou querendo agendar uma consulta com a Dra. Laura para a próxima segunda-feira.

**Passo 1:** Verificar os horários disponíveis da Dra. Laura na segunda-feira:
```
GET /schedules/available?employeeId=12345678900&dayOfWeek=1
```

**Passo 2:** Após confirmar a disponibilidade, agendar a consulta para as 9h:
```json
// POST /appointments
{
  "date": "2024-01-15",    // Data da consulta (próxima segunda)
  "startTime": "09:00",    // Horário de início
  "endTime": "09:30",      // Horário de término (30 minutos de consulta)
  "scheduleId": "c5c3b478-1b7f-4b9e-8c1d-7a3f8b4e9f0a",  // ID da agenda de segunda
  "patientId": "11122233344",  // CPF do Sr. Paulo
  "employeeId": "12345678900"  // CPF da Dra. Laura
}
```

**Passo 3:** Confirmar o agendamento (pode ser feito de imediato ou posteriormente):
```json
// PATCH /appointments/{id}/status
{
  "status": "CONFIRMADO"
}
```

#### 3. Reagendando uma Consulta

O Sr. Paulo ligou novamente e precisa remarcar sua consulta para quarta-feira.

**Passo 1:** Cancelar o agendamento atual:
```json
// PATCH /appointments/{id}/status
{
  "status": "CANCELADO"
}
```

**Passo 2:** Verificar disponibilidade para quarta-feira:
```
GET /schedules/available?employeeId=12345678900&dayOfWeek=3
```

**Passo 3:** Criar um novo agendamento:
```json
// POST /appointments
{
  "date": "2024-01-17",    // Data da consulta (quarta-feira)
  "startTime": "10:00",
  "endTime": "10:30",
  "scheduleId": "d6d4c589-2c8f-5c0f-9d2e-8b4f9c5e0f1b",  // ID da agenda de quarta
  "patientId": "11122233344",
  "employeeId": "12345678900"
}
```

#### 4. No Dia da Consulta

**Passo 1:** A recepcionista recebe o paciente e confirma sua presença no sistema:
```json
// PATCH /appointments/{id}/status
{
  "status": "CONFIRMADO"  // Se ainda estiver como PENDENTE
}
```

**Passo 2:** Após a consulta, a Dra. Laura finaliza o atendimento e registra o prontuário:
```json
// PATCH /appointments/{id}/finalize
{
  "symptoms": "Paciente relata dores no peito e falta de ar durante atividades físicas leves",
  "diagnosis": "Suspeita de angina estável",
  "conduct": "Solicitação de exames complementares (eletrocardiograma e teste ergométrico)"
}
```

**Passo 3:** A Dra. Laura adiciona uma prescrição ao prontuário (usando o endpoint de prescrições).

### 📝 Fluxo Completo de Agendamento

1. Crie agendas para os profissionais (horários disponíveis)
2. Consulte os horários disponíveis para um profissional
3. Crie um agendamento para um paciente
4. Confirme o agendamento (mude o status para "CONFIRMADO")
5. No dia da consulta, finalize o agendamento e crie o prontuário
6. Se necessário, adicione prescrições ao prontuário

### 🧑‍⚕️ Exemplo de Uso para Clínica

#### 1. Configurando horários do Dr. João (Segunda-feira, manhã)

```json
// POST /schedules
{
  "dayOfWeek": 1,
  "startTime": "08:00", 
  "endTime": "12:00",
  "employeeId": "12345678900"
}
```

#### 2. Paciente Ana agenda consulta

```json
// POST /appointments
{
  "date": "2023-12-11", // Segunda-feira
  "startTime": "09:00",
  "endTime": "09:30",
  "scheduleId": "c5c3b478-1b7f-4b9e-8c1d-7a3f8b4e9f0a",
  "patientId": "98765432100",
  "employeeId": "12345678900"
}
```

#### 3. Recepcionista confirma o agendamento

```json
// PATCH /appointments/{id}/status
{
  "status": "CONFIRMADO"
}
```

#### 4. Dr. João finaliza a consulta

```json
// PATCH /appointments/{id}/finalize
{
  "symptoms": "Dor de cabeça e febre há 3 dias",
  "diagnosis": "Sinusite",
  "conduct": "Medicação e retorno em 7 dias"
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

## ❓ Perguntas Frequentes (FAQ) - Sistema de Agendamento

### 1. Como funcionam os horários de atendimento no sistema?
O sistema divide o tempo de trabalho dos profissionais em agendas semanais. Cada profissional tem horários definidos para cada dia da semana (por exemplo, segundas das 8h às 12h), e esses horários se repetem toda semana. Os agendamentos são feitos dentro desses horários disponíveis.

### 2. Como agendo uma consulta para um paciente?
Para agendar uma consulta, você precisa:
1. Verificar os horários disponíveis do profissional (`GET /schedules/available`)
2. Criar um agendamento no horário desejado (`POST /appointments`)
3. Confirmar o agendamento alterando seu status para "CONFIRMADO"

### 3. Como sei se um horário está ocupado?
Ao tentar criar um agendamento, o sistema verifica automaticamente se há conflitos. Se já existir uma consulta agendada para o mesmo profissional, na mesma data e horário, o sistema retornará um erro de "Conflito de horário para este funcionário".

### 4. O que significam os diferentes status de agendamento?
- **PENDENTE**: Agendamento inicial, aguardando confirmação
- **CONFIRMADO**: Agendamento confirmado, pronto para atendimento
- **FINALIZADO**: Consulta realizada e prontuário registrado
- **CANCELADO**: Agendamento cancelado, horário liberado

### 5. Como remarco uma consulta?
Para remarcar, recomendamos:
1. Cancelar o agendamento atual (mudar status para "CANCELADO")
2. Criar um novo agendamento na data/hora desejada
Isso mantém o histórico completo de todas as mudanças no sistema.

### 6. Como registro o resultado de uma consulta?
Após a consulta, utilize o endpoint `/appointments/{id}/finalize` para registrar os dados do atendimento (sintomas, diagnóstico e conduta). Isso criará automaticamente um prontuário e mudará o status do agendamento para "FINALIZADO".

### 7. É possível definir horários diferentes para cada semana?
O sistema atual trabalha com repetição semanal. Para casos especiais (como férias ou folgas), recomendamos cancelar os agendamentos daquele período específico ou criar uma regra de negócio adicional para bloquear datas específicas.

### 8. Como funcionam as consultas de retorno?
Consultas de retorno são agendadas como novos agendamentos. Recomendamos anotar no campo "symptoms" do prontuário quando se trata de um retorno, para manter o histórico do paciente.

### 9. Como lidar com atrasos de pacientes?
O sistema não gerencia atrasos automaticamente. Recomendamos que a clínica estabeleça uma política (por exemplo, tolerância de 15 minutos) e que a recepcionista gerencie manualmente, mantendo o status como "CONFIRMADO" enquanto aguarda.

### 10. Posso definir a duração das consultas?
Sim, ao criar um agendamento, você define o horário de início (`startTime`) e o horário de término (`endTime`). Isso permite configurar diferentes durações para cada especialidade ou tipo de consulta.

### 11. Como funciona o controle de disponibilidade?
O sistema cruza as informações das agendas (horários gerais disponíveis) com os agendamentos já marcados para determinar os horários livres. Um horário só estará disponível se estiver dentro da agenda do profissional e não tiver outro agendamento conflitante.

### 12. Os pacientes podem fazer agendamentos online?
O sistema suporta essa funcionalidade através dos mesmos endpoints, mas com controle de acesso adequado. Você pode implementar uma interface web ou mobile que use a API para permitir que pacientes visualizem horários disponíveis e façam seus próprios agendamentos.



