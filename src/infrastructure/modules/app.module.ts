// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/infrastructure/modules/auth.module';
import { UserModule } from 'src/infrastructure/modules/user.module';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module'; // <-- o caminho certo
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from 'src/infrastructure/modules/company.module';
import { TypeModule } from 'src/infrastructure/modules/type.module';
import { EmployeeModule } from 'src/infrastructure/modules/employee.module';
import { EmployeeTypeModule } from 'src/infrastructure/modules/employee-type.module';
import { PatientModule } from 'src/infrastructure/modules/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, 
    AuthModule,
    UserModule,
    CompanyModule,
    TypeModule,
    EmployeeTypeModule,
    EmployeeModule,
    PatientModule,
  ],
})
export class AppModule {}
