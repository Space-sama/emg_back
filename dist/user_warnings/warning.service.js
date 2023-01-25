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
exports.WarningService = void 0;
const dist_1 = require("@nestjs/schedule/dist");
const warning_model_1 = require("./warning.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const moment = require("moment");
let WarningService = class WarningService {
    constructor(warningModel) {
        this.warningModel = warningModel;
    }
    async getAllWarnings() {
        const allWarnings = await this.warningModel.find({}).exec();
        return allWarnings;
    }
    async addWarning(warningObj) {
        let warningToSave = new this.warningModel({
            f_name: warningObj.f_name,
            l_name: warningObj.l_name,
            cin: warningObj.cin,
            w_one: "",
            w_two: "",
            w_three: "",
            tentative: warningObj.tentative,
            createdAt: Date.now(),
            updatedAt: null,
            activateIn: null,
        });
        let userCreated = await warningToSave.save();
        return userCreated;
    }
    async updateWarning(idWarn, warnObj) {
        warnObj.updatedAt = Date.now().toString();
        return await this.warningModel.findByIdAndUpdate(idWarn, warnObj);
    }
    async deleteWarning(id) {
        return await this.warningModel.findByIdAndDelete(id);
    }
    async findByCin(cin) {
        return await this.warningModel.findOne({ "cin": cin }).exec();
    }
    async ActivateUserAfterYear() {
        let allDesactivatedWarnings = await this.warningModel.find({ "tentative": 3 }).exec();
        let now = moment().startOf('day');
        if (allDesactivatedWarnings.length > 0) {
            for (let i = 0; i < allDesactivatedWarnings.length; i++) {
                if (moment(allDesactivatedWarnings[i].activateIn).add('days') < now) {
                    console.log("warning update founded ", allDesactivatedWarnings[i].cin);
                    await this.warningModel.findByIdAndUpdate({ _id: allDesactivatedWarnings[i]._id }, { "$set": {
                            "tentative": 0,
                            "w_one": null,
                            "w_two": null,
                            "w_three": null,
                            "updatedAt": moment().startOf('day'),
                            "activateIn": null,
                        } }).exec();
                }
                else {
                    console.log("Not > of one year yet !");
                }
            }
        }
        else {
            console.log("Warnings to update for years not founded !");
        }
    }
};
__decorate([
    (0, dist_1.Cron)(dist_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarningService.prototype, "ActivateUserAfterYear", null);
WarningService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(warning_model_1.Warning.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], WarningService);
exports.WarningService = WarningService;
//# sourceMappingURL=warning.service.js.map