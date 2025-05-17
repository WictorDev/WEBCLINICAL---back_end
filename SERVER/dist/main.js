"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./infrastructure/modules/app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('WebClinical api')
        .setDescription('The webclinical api documentation')
        .setVersion('1.0')
        .addTag('users')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        exposedHeaders: ['Set-Cookie'],
        credentials: true,
    });
    await app.listen(8080);
    console.log(`API rodando em: http://localhost:8080`);
}
bootstrap();
//# sourceMappingURL=main.js.map