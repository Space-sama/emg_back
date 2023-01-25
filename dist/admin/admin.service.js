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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin_model_1 = require("./admin.model");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async getAll() {
        const allAdmin = await this.adminModel.find({}).exec();
        return allAdmin;
    }
    async getOne(id) {
        return await this.adminModel.findById({ _id: id }).exec();
    }
    async getOneByMail(email) {
        return await this.adminModel.findOne({ email: email }).exec();
    }
    async register(adminObj) {
        const hashedPwd = await bcrypt.hash(adminObj.pwd, 12);
        let adminToSave = new this.adminModel({
            firstName: adminObj.firstName,
            lastName: adminObj.lastName,
            profession: adminObj.profession,
            email: adminObj.email,
            pwd: hashedPwd,
            track: adminObj.pwd,
            createdAt: Date.now()
        });
        let adminCreated = await adminToSave.save();
        return adminCreated;
    }
    async update(id, adminObj) {
        return await this.adminModel.findByIdAndUpdate(id, adminObj);
    }
    async deleteOne(id) {
        let findAdmin = await this.adminModel.findById(id);
        return await this.adminModel.findByIdAndDelete(id);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_model_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map