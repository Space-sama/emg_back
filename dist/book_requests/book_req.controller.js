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
exports.Books_Req_Controller = void 0;
const common_1 = require("@nestjs/common");
const book_req_service_1 = require("./book_req.service");
const create_book_req_1 = require("../dtos/create_book_req");
const update_book_req_1 = require("../dtos/update_book_req");
let Books_Req_Controller = class Books_Req_Controller {
    constructor(book_req_service) {
        this.book_req_service = book_req_service;
    }
    getAllBooks_Req() {
        return this.book_req_service.getAllBooksReq();
    }
    getAllBooks_Req_Purchased() {
        return this.book_req_service.getAllPurchased();
    }
    getOneBook_Req(idBook) {
        return this.book_req_service.getOneBookReq(idBook);
    }
    addOneBook(bookObj) {
        return this.book_req_service.addOneBookReq(bookObj);
    }
    async updateOneBook(id, bookObj) {
        return this.book_req_service.updateOneBookReq(id, bookObj);
    }
    async updateAvailibility(id) {
        return this.book_req_service.updateAvailibility(id);
    }
    async updateAvailibility_2(id) {
        return this.book_req_service.updateAvailibility_2(id);
    }
    async deleteOneBook(id) {
        return await this.book_req_service.deleteOneBookReq(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Books_Req_Controller.prototype, "getAllBooks_Req", null);
__decorate([
    (0, common_1.Get)("purchased"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Books_Req_Controller.prototype, "getAllBooks_Req_Purchased", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Books_Req_Controller.prototype, "getOneBook_Req", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_req_1.CreateReqBookDTO]),
    __metadata("design:returntype", Promise)
], Books_Req_Controller.prototype, "addOneBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_book_req_1.UpdateReqBookDTO]),
    __metadata("design:returntype", Promise)
], Books_Req_Controller.prototype, "updateOneBook", null);
__decorate([
    (0, common_1.Put)('changeAv/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Books_Req_Controller.prototype, "updateAvailibility", null);
__decorate([
    (0, common_1.Put)('changeAv_2/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Books_Req_Controller.prototype, "updateAvailibility_2", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Books_Req_Controller.prototype, "deleteOneBook", null);
Books_Req_Controller = __decorate([
    (0, common_1.Controller)('books_req'),
    __metadata("design:paramtypes", [book_req_service_1.Book_Req_Service])
], Books_Req_Controller);
exports.Books_Req_Controller = Books_Req_Controller;
//# sourceMappingURL=book_req.controller.js.map