# Webclinical - Backend

## Descrição do Projeto
Webclinical é um sistema web para clínicas, onde o próprio usuário pode pré-agendar consultas com profissionais de saúde, escolhendo horários disponíveis na agenda. O agendamento pode ser confirmado por meio de pagamento online ou presencialmente na clínica. Este backend é responsável por gerenciar os dados dos usuários, consultas, histórico de atendimentos e a integração com o gateway de pagamento.

## Tecnologias Utilizadas
- **NestJS**: Framework para criação de aplicações escaláveis em Node.js.
- **PrismaORM**: ORM para interação com o banco de dados.
- **JWT**: Para autenticação e autorização segura.
- **Bcrypt**: Para encriptação de senhas.

## Pré-Requisitos
- **Node.js**: Certifique-se de ter uma versão compatível instalada.
- **Banco de Dados**: O arquivo `.env` está configurado para utilizar um banco de dados na máquina do desenvolvedor. Crie o banco de dados conforme as configurações especificadas no arquivo.

## Instalação
1. Clone o repositório.
2. No diretório do projeto, execute:
   ```bash
   npm i
3. Certifique-se de que o banco de dados está criado e configurado de acordo com as variáveis definidas no arquivo .env.

## Execução do Projeto
1. Para iniciar a aplicação:
   ```bash
  npm run start
2. Para iniciar a aplicação em modo de desenvolvimento
   ```bash
  npm run start:dev

## Estrutura de Pastas
A organização do projeto segue os princípios da Clean Architecture, com a separação clara entre os módulos, controllers, services, etc. Isso facilita a manutenção e a escalabilidade da aplicação.

## Documentação de Endpoints
A documentação dos endpoints será disponibilizada via Swagger. Após iniciar o servidor, acesse a rota designada para visualizar e interagir com a API.