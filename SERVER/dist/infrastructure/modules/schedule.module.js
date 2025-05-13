"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const schedule_controller_1 = require("../controllers/schedule.controller");
const prisma_schedule_repository_1 = require("../db/repositories/prisma-schedule.repository");
const find_available_schedules_usecase_1 = require("../../use-case/schedule/find-available-schedules.usecase");
const create_schedule_usecase_1 = require("../../use-case/schedule/create-schedule.usecase");
const tokens_constants_1 = require("../constants/tokens.constants");
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
        ],
        controllers: [schedule_controller_1.ScheduleController],
        providers: [
            {
                provide: tokens_constants_1.SCHEDULE_REPOSITORY_TOKEN,
                useClass: prisma_schedule_repository_1.PrismaScheduleRepository,
            },
            prisma_schedule_repository_1.PrismaScheduleRepository,
            find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
            create_schedule_usecase_1.CreateScheduleUseCase,
        ],
        exports: [
            tokens_constants_1.SCHEDULE_REPOSITORY_TOKEN,
            prisma_schedule_repository_1.PrismaScheduleRepository,
            find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
            create_schedule_usecase_1.CreateScheduleUseCase,
        ],
    })
], ScheduleModule);
//# sourceMappingURL=schedule.module.js.map