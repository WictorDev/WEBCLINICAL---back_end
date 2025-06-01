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
const schedule_repository_1 = require("../../domain/repositories/schedule.repository");
const create_schedule_usecase_1 = require("../../use-case/schedule/create-schedule.usecase");
const update_schedule_usecase_1 = require("../../use-case/schedule/update-schedule.usecase");
const delete_schedule_usecase_1 = require("../../use-case/schedule/delete-schedule.usecase");
const find_schedule_by_id_usecase_1 = require("../../use-case/schedule/find-schedule-by-id.usecase");
const find_schedules_by_employee_usecase_1 = require("../../use-case/schedule/find-schedules-by-employee.usecase");
const find_available_schedules_usecase_1 = require("../../use-case/schedule/find-available-schedules.usecase");
const find_all_avaiable_schedules_usecase_1 = require("../../use-case/schedule/find-all-avaiable-schedules.usecase");
const find_all_schedules_usecase_1 = require("../../use-case/schedule/find-all-schedules.usecase");
const appointment_module_1 = require("./appointment.module");
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            (0, common_1.forwardRef)(() => appointment_module_1.AppointmentModule),
        ],
        controllers: [schedule_controller_1.ScheduleController],
        providers: [
            {
                provide: schedule_repository_1.ScheduleRepository,
                useClass: prisma_schedule_repository_1.PrismaScheduleRepository,
            },
            prisma_schedule_repository_1.PrismaScheduleRepository,
            create_schedule_usecase_1.CreateScheduleUseCase,
            update_schedule_usecase_1.UpdateScheduleUseCase,
            delete_schedule_usecase_1.DeleteScheduleUseCase,
            find_schedule_by_id_usecase_1.FindScheduleByIdUseCase,
            find_schedules_by_employee_usecase_1.FindSchedulesByEmployeeUseCase,
            find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
            find_all_avaiable_schedules_usecase_1.FindAllAvailableSchedulesUseCase,
            find_all_schedules_usecase_1.FindAllSchedulesUseCase,
        ],
        exports: [
            schedule_repository_1.ScheduleRepository,
            prisma_schedule_repository_1.PrismaScheduleRepository,
            create_schedule_usecase_1.CreateScheduleUseCase,
            update_schedule_usecase_1.UpdateScheduleUseCase,
            delete_schedule_usecase_1.DeleteScheduleUseCase,
            find_schedule_by_id_usecase_1.FindScheduleByIdUseCase,
            find_schedules_by_employee_usecase_1.FindSchedulesByEmployeeUseCase,
            find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
            find_all_avaiable_schedules_usecase_1.FindAllAvailableSchedulesUseCase,
            find_all_schedules_usecase_1.FindAllSchedulesUseCase,
        ],
    })
], ScheduleModule);
//# sourceMappingURL=schedule.module.js.map