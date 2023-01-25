"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningController = void 0;
const update_warning_dto_1 = require("./../dtos/update_warning.dto");
const create_warning_dto_1 = require("./../dtos/create_warning.dto");
const common_1 = require("@nestjs/common");
const warning_service_1 = require("./warning.service");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
let WarningController = class WarningController {
    constructor(warnService) {
        this.warnService = warnService;
    }
    async all() {
        return await this.warnService.getAllWarnings();
    }
    async findWarnings() {
        return await this.warnService.ActivateUserAfterYear();
    }
    addOneUser(warnObj) {
        return this.warnService.addWarning(warnObj);
    }
    editWarning(id, warnObj) {
        return this.warnService.updateWarning(id, warnObj);
    }
    async deleteOneUser(id) {
        return await this.warnService.deleteWarning(id);
    }
    async findByCIN(cin) {
        return await this.warnService.findByCin(cin);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarningController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarningController.prototype, "findWarnings", null);
__decorate([
    (0, request_mapping_decorator_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_warning_dto_1.CreateWarningDTO]),
    __metadata("design:returntype", Promise)
], WarningController.prototype, "addOneUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_warning_dto_1.UpdateWarningDTO]),
    __metadata("design:returntype", Promise)
], WarningController.prototype, "editWarning", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarningController.prototype, "deleteOneUser", null);
__decorate([
    (0, common_1.Get)('cin/:cin'),
    __param(0, (0, common_1.Param)('cin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarningController.prototype, "findByCIN", null);
WarningController = __decorate([
    (0, common_1.Controller)('warnings'),
    __metadata("design:paramtypes", [warning_service_1.WarningService])
], WarningController);
exports.WarningController = WarningController;
//# sourceMappingURL=warning.controller.js.map