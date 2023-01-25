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
exports.Book_Req_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const book_req_model_1 = require("./book_req.model");
let Book_Req_Service = class Book_Req_Service {
    constructor(book_req_Model) {
        this.book_req_Model = book_req_Model;
    }
    async getAllBooksReq() {
        return await this.book_req_Model.find({ status: "Active", availibility: "in_progress" }).populate('domain').exec();
    }
    async updateAvailibility(id) {
        return await this.book_req_Model.findByIdAndUpdate({ "_id": id }, { "$set": { "availibility": "purchased" } }).exec();
    }
    async updateAvailibility_2(id) {
        return await this.book_req_Model.findByIdAndUpdate({ "_id": id }, { "$set": { "availibility": "in_progress" } }).exec();
    }
    async getAllPurchased() {
        return await this.book_req_Model.find({ status: "Active", availibility: "purchased" }).populate('domain').exec();
    }
    async getOneBookReq(idBook) {
        return this.book_req_Model.findOne({ _id: idBook }).populate('domain').exec();
    }
    async addOneBookReq(bookObj) {
        let bookToSave = new this.book_req_Model({
            nameBook: bookObj.nameBook,
            author: bookObj.author,
            pages: bookObj.pages,
            faculty: bookObj.faculty,
            bookType: bookObj.bookType,
            createdAt: Date.now(),
            status: 'Active',
            availibility: 'in_progress',
            applicant: bookObj.applicant,
            phone: bookObj.phone,
            email: bookObj.email,
            domain: bookObj.domain,
        });
        let bookCreated = await bookToSave.save();
        return bookCreated;
    }
    async updateOneBookReq(idBook, bookObj) {
        bookObj.updatedAt = Date.now().toString();
        return await this.book_req_Model.findByIdAndUpdate(idBook, bookObj);
    }
    async deleteOneBookReq(idBook) {
        return await this.book_req_Model.findByIdAndDelete(idBook);
    }
};
Book_Req_Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(book_req_model_1.Book_Req.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], Book_Req_Service);
exports.Book_Req_Service = Book_Req_Service;
//# sourceMappingURL=book_req.service.js.map