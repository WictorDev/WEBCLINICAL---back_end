# WEBCLINICAL - Backend

## Novas Funcionalidades: Ciclo Completo do Paciente

O sistema agora cobre todo o ciclo do paciente, incluindo:
- **Horários disponíveis (Schedule)**
- **Agendamento (Appointment)**
- **Prontuário (MedicalRecord)**
- **Receita médica (Prescription)**

### Estrutura dos Novos Módulos

- **Entidades:**
  - `src/domain/entities/schedule.ts`
  - `src/domain/entities/appointment.ts`
  - `src/domain/entities/medical-record.ts`
  - `src/domain/entities/prescription.ts`

- **Repositórios:**
  - `src/domain/repositories/schedule.repository.ts`
  - `src/domain/repositories/appointment.repository.ts`
  - `src/domain/repositories/medical-record.repository.ts`
  - `src/domain/repositories/prescription.repository.ts`

- **Implementações Prisma:**
  - `src/infrastructure/db/repositories/prisma-schedule.repository.ts`
  - `src/infrastructure/db/repositories/prisma-appointment.repository.ts`
  - `src/infrastructure/db/repositories/prisma-medical-record.repository.ts`
  - `src/infrastructure/db/repositories/prisma-prescription.repository.ts`

- **Casos de Uso:**
  - `src/use-case/schedule/find-available-schedules.usecase.ts`
  - `src/use-case/appointment/create-appointment.usecase.ts`
  - `src/use-case/appointment/find-employee-appointments.usecase.ts`
  - `src/use-case/appointment/finalize-appointment.usecase.ts`
  - `src/use-case/medical-record/add-prescription.usecase.ts`

- **Controllers:**
  - `src/infrastructure/controllers/schedule.controller.ts`
  - `src/infrastructure/controllers/appointment.controller.ts`
  - `src/infrastructure/controllers/medical-record.controller.ts`
  - `src/infrastructure/controllers/prescription.controller.ts`

---

## Rotas Principais

### Horários Disponíveis
- `GET /schedules/available?employeeId=...&dayOfWeek=...` (Paciente autenticado)

### Agendamento
- `POST /appointments` (Paciente autenticado)
- `GET /appointments/employee?employeeId=...&date=...` (Funcionário autenticado)

### Prontuário
- `POST /medical-records/finalize` (Profissional autenticado)
- `GET /medical-records?appointmentId=...` (Paciente ou profissional autenticado)

### Receita Médica
- `POST /prescriptions` (Profissional autenticado)
- `GET /prescriptions?medicalRecordId=...` (Paciente ou profissional autenticado)

---

## Autenticação JWT (Login Unificado e Cookies HttpOnly)

O sistema utiliza autenticação baseada em JWT, com foco em segurança e experiência do usuário. Veja como funciona:

### 1. Login Unificado
- O usuário pode fazer login usando CPF ou e-mail.
- O backend verifica se o identificador existe como paciente, profissional ou ambos.
- Se existir em ambos, o backend retorna `{ multiplosPerfis: true }` e o frontend exibe uma tela para o usuário escolher o perfil (paciente ou profissional).
- Após a escolha, o backend retorna o JWT e o nome do usuário.

### 2. Armazenamento Seguro do Token
- O JWT é enviado do backend para o frontend como um **cookie HttpOnly** (não acessível via JavaScript), aumentando a segurança contra XSS.
- O frontend faz requisições autenticadas usando `withCredentials: true` no axios/fetch.

### 3. Proteção de Rotas
- Todas as rotas protegidas exigem autenticação JWT.
- O backend utiliza guards que leem o token do cookie HttpOnly.
- O frontend redireciona para login caso o usuário não esteja autenticado.

### 4. Logout
- O logout é feito via endpoint dedicado, que remove o cookie JWT do navegador.
- O frontend limpa o estado do usuário e redireciona para a Home.

### 5. Fluxo Resumido
1. Usuário faz login → backend retorna cookie JWT.
2. Frontend salva nome do usuário (não o token) no localStorage para exibição.
3. Requisições autenticadas usam o cookie automaticamente.
4. Logout remove o cookie e limpa o estado.

### 6. Boas Práticas
- Nunca armazene o JWT em localStorage/sessionStorage.
- Sempre use cookies HttpOnly para tokens sensíveis.
- Proteja endpoints sensíveis com guards e validação de perfil.

---

## Observações para Desenvolvedores

- **Clean Architecture:**
  - Entidades e casos de uso são independentes de framework.
  - Prisma é usado apenas na camada de repositório.
- **Validação de Conflito:**
  - O caso de uso de agendamento impede sobreposição de horários para o mesmo funcionário.
- **Guards:**
  - As rotas estão protegidas por autenticação básica (`AuthGuard`).
  - Recomenda-se aprimorar os guards para garantir acesso apenas ao paciente/profissional responsável.
- **Expansão:**
  - Para exportação de PDF, recomenda-se usar bibliotecas como `pdfkit` ou `puppeteer`.

---

## Como Contribuir

1. Siga o padrão de Clean Architecture já estabelecido.
2. Crie novas entidades, repositórios e casos de uso conforme necessário.
3. Registre novos providers e controllers no `AppModule` (`src/infrastructure/modules/app.module.ts`).
4. Mantenha as rotas protegidas e documentadas.

Dúvidas? Consulte os exemplos de código
