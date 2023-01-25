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
exports.UsersController = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const create_users_dto_1 = require("../dtos/create-users.dto");
const update_users_dto_1 = require("../dtos/update-users.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async sayHello() {
        return await this.userService.send();
    }
    async all() {
        return await this.userService.users();
    }
    async alreadyIssued() {
        return await this.userService.booksAlreadyIssued();
    }
    async alreadyIssuedCivil() {
        return await this.userService.booksAlreadyIssuedCivilEng();
    }
    async alreadyIssuedInfo() {
        return await this.userService.booksAlreadyIssuedInfoEng();
    }
    async alreadyIssuedID() {
        return await this.userService.booksAlreadyIssuedIDEng();
    }
    async alreadyIssuedEL() {
        return await this.userService.booksAlreadyIssuedEL();
    }
    async alreadyIssuedSM() {
        return await this.userService.booksAlreadyIssuedSM();
    }
    async alreadyIssuedFN() {
        return await this.userService.booksAlreadyIssuedFN();
    }
    async alreadyIssuedGN() {
        return await this.userService.booksAlreadyIssuedGN();
    }
    async getWhenShouldReturnBook() {
        return await this.userService.getWhenShouldReturnBook();
    }
    async getAll() {
        return await this.userService.getAllUsers();
    }
    async getStudents() {
        return await this.userService.getStudents();
    }
    async getProfs() {
        return await this.userService.getProfesseurs();
    }
    async getAdministratif() {
        return await this.userService.getAdministrative();
    }
    async getHistory() {
        return await this.userService.getAllHistoryUsers();
    }
    TimeToreturnBook() {
        return this.userService.getByShouldReturnedTheBook();
    }
    async getOneUser(idUser) {
        console.log("Get one");
        return await this.userService.getOneUser(idUser);
    }
    async updateToReturned(idUser) {
        console.log("Book Returned");
        return await this.userService.bookReturned(idUser);
    }
    addOneUser(userObj) {
        return this.userService.addOneUser(userObj);
    }
    addOneUserByCIN(userObj) {
        return this.userService.addUserByCIN(userObj);
    }
    async updateOneUser(id, userObj) {
        console.log("Update One");
        return await this.userService.updateOneUser(id, userObj);
    }
    async deleteOneUser(id) {
        return await this.userService.deleteOneUser(id);
    }
};
__decorate([
    (0, common_1.Get)('sayHello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sayHello", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('alreadyIssued'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssued", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedCivil'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedCivil", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedInfo", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedID'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedID", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedEL'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedEL", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedSM'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedSM", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedFN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedFN", null);
__decorate([
    (0, common_1.Get)('alreadyIssuedGN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alreadyIssuedGN", null);
__decorate([
    (0, common_1.Get)('getOnlyIfShouldReturn'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getWhenShouldReturnBook", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('profs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfs", null);
__decorate([
    (0, common_1.Get)('administratif'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAdministratif", null);
__decorate([
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)('return'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "TimeToreturnBook", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Get)('bookReturned/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateToReturned", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addOneUser", null);
__decorate([
    (0, common_1.Post)('exist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addOneUserByCIN", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_users_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateOneUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteOneUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map