// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/infrastructure/modules/auth.module';
import { UserModule } from 'src/infrastructure/modules/user.module';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module'; // <-- o caminho certo
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, 
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
