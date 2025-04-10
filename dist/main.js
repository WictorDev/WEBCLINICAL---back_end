"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./infrastructure/modules/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
        methods: 'GET,POST,PUT,DELETE,PATCH',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    });
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map