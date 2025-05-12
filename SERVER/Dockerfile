FROM node:20-alpine

WORKDIR /app

# Instala dependências de build
RUN apk add --no-cache python3 make g++

# Copia arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências
RUN npm install

# Gera o Prisma Client
RUN npx prisma generate

# Copia o resto do código
COPY . .

# Expõe a porta
EXPOSE 8080

# Comando para iniciar
CMD ["npm", "run", "start:dev"] 