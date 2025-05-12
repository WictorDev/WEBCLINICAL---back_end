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

Dúvidas? Consulte os exemplos de código ou abra uma issue!
