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
exports.BooksController = void 0;
const update_book_dto_1 = require("./../dtos/update-book.dto");
const create_book_dto_1 = require("./../dtos/create-book.dto");
const book_service_1 = require("./book.service");
const common_1 = require("@nestjs/common");
let BooksController = class BooksController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async totalBooksInfo() {
        return await this.bookService.totalBooksInfo();
    }
    async totalBooksID() {
        return await this.bookService.totalBooksID();
    }
    async totalBooksFN() {
        return await this.bookService.totalBooksFN();
    }
    async totalBooksGN() {
        return await this.bookService.totalBooksGN();
    }
    async totalBooksEL() {
        return await this.bookService.totalBooksEL();
    }
    async totalBooksCV() {
        return await this.bookService.totalBooksCV();
    }
    async totalBooksSM() {
        return await this.bookService.totalBooksSM();
    }
    getAllBooks() {
        return this.bookService.getAllBooks();
    }
    getAllBooksByDispo() {
        return this.bookService.getAllBooksByDispo();
    }
    getOneBook(idBook) {
        return this.bookService.getOneBook(idBook);
    }
    getByFields(bookObj) {
        return this.bookService
            .getByFields(bookObj.nameBook, bookObj.author, bookObj.edition, bookObj.editor, bookObj.domain);
    }
    addOneBook(bookObj) {
        return this.bookService.addOneBook(bookObj);
    }
    async updateOneBook(id, bookObj) {
        return this.bookService.updateOneBook(id, bookObj);
    }
    async deleteOneBook(id) {
        return await this.bookService.deleteOneBook(id);
    }
};
__decorate([
    (0, common_1.Get)('/totalBooksInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksInfo", null);
__decorate([
    (0, common_1.Get)('/totalBooksID'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksID", null);
__decorate([
    (0, common_1.Get)('/totalBooksFN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksFN", null);
__decorate([
    (0, common_1.Get)('/totalBooksGN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksGN", null);
__decorate([
    (0, common_1.Get)('/totalBooksEL'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksEL", null);
__decorate([
    (0, common_1.Get)('/totalBooksCV'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksCV", null);
__decorate([
    (0, common_1.Get)('/totalBooksSM'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "totalBooksSM", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('/availability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getAllBooksByDispo", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getOneBook", null);
__decorate([
    (0, common_1.Post)('/getByFields'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_book_dto_1.UpdateBookDTO]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getByFields", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "addOneBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_book_dto_1.UpdateBookDTO]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateOneBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteOneBook", null);
BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=book.controller.js.map