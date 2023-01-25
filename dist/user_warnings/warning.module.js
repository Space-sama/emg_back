"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningModule = void 0;
const common_1 = require("@nestjs/common");
const warning_service_1 = require("./warning.service");
const warning_controller_1 = require("./warning.controller");
const warning_model_1 = require("./warning.model");
const mongoose_1 = require("@nestjs/mongoose");
let WarningModule = class WarningModule {
};
WarningModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: warning_model_1.Warning.name, schema: warning_model_1.WarningSchema },
            ]),
        ],
        controllers: [warning_controller_1.WarningController],
        providers: [warning_service_1.WarningService],
        exports: [warning_service_1.WarningService],
    })
], WarningModule);
exports.WarningModule = WarningModule;
//# sourceMappingURL=warning.module.js.map