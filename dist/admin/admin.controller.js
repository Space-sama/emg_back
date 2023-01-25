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
exports.AdminController = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("../dtos/create_admin.dto");
const update_admin_dto_1 = require("../dtos/update_admin.dto");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AdminController = class AdminController {
    constructor(adminService, jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }
    async getAuthenticated(req) {
        try {
            const cookie = req.cookies['jwt-3'];
            console.log("Get cookie getAuth --->", cookie);
            const data = await this.jwtService.verify(cookie);
            if (!data) {
                throw new exceptions_1.UnauthorizedException();
            }
            console.log("data exist , with success ", data);
            const getUserAuth = await this.adminService.getOne(data._id);
            console.log("get User Auth ", getUserAuth);
            return getUserAuth;
        }
        catch (error) {
            throw new exceptions_1.UnauthorizedException();
        }
    }
    async getOne(id) {
        const user = await this.adminService.getOne(id);
        console.log("user ", user);
        return user;
    }
    async getAll() {
        return await this.adminService.getAll();
    }
    addOne(obj) {
        return this.adminService.register(obj);
    }
    async updateOne(id, adminObj) {
        return await this.adminService.update(id, adminObj);
    }
    async deleteOne(id) {
        return await this.adminService.deleteOne(id);
    }
    async login(loginUser, res) {
        let user = await this.adminService.getOneByMail(loginUser.email);
        if (!user) {
            throw new common_1.BadRequestException("invalid email");
        }
        if (!await bcrypt.compare(loginUser.pwd, user.pwd)) {
            throw new common_1.BadRequestException("invalid pwd");
        }
        const jwt = await this.jwtService.signAsync({ _id: user === null || user === void 0 ? void 0 : user._id, firstName: user === null || user === void 0 ? void 0 : user.firstName, lastName: user === null || user === void 0 ? void 0 : user.lastName,
        });
        res.cookie('jwt-3', jwt, { httpOnly: true });
        return {
            accessToken: jwt,
        };
    }
    async logout(res) {
        res.clearCookie('jwt-3');
        return {
            message: "success clearing the JWT..",
        };
    }
};
__decorate([
    (0, common_1.Get)('auth'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuthenticated", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDTO, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logout", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService, jwt_1.JwtService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map