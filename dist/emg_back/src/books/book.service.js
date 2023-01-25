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
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let BookService = class BookService {
    constructor(bookModel, userModel) {
        this.bookModel = bookModel;
        this.userModel = userModel;
    }
    async getAllBooks() {
        const books = await this.bookModel.find({}).populate('domain').exec();
        return books;
    }
    async getAllBooksByDispo() {
        return await this.bookModel.find({ isIssued: 'false' }).populate('domain').exec();
    }
    async getByFields(title, author, edition, editor, label) {
        let objFounded = await this.bookModel.find({
            $or: [
                {
                    "nameBook": title
                },
                {
                    "author": author
                },
                {
                    "edition": edition
                },
                {
                    "editor": editor
                },
                {
                    "domain": label
                },
            ]
        }).populate('domain').exec();
        return objFounded;
    }
    async getOneBook(idBook) {
        return this.bookModel.findOne({ _id: idBook }).populate('domain').exec();
    }
    async addOneBook(bookObj) {
        let bookToSave = new this.bookModel({
            nameBook: bookObj.nameBook,
            identifiant: bookObj.identifiant,
            location: bookObj.location,
            ISBN: bookObj.ISBN,
            author: bookObj.author,
            pages: bookObj.pages,
            faculty: bookObj.faculty,
            edition: bookObj.edition,
            editor: bookObj.editor,
            bookType: bookObj.bookType,
            createdAt: Date.now(),
            status: 'Active',
            isIssued: false,
            domain: bookObj.domain,
            keyWords: bookObj.keyWords,
        });
        let findAlreadyExist = await this.bookModel.find({ $or: [
                { ISBN: bookToSave.ISBN },
                { identifiant: bookToSave.identifiant },
                { location: bookToSave.location }
            ] });
        if (findAlreadyExist.length > 0) {
            console.log("Ce document déjà existe dans la bibliothèque !");
            return ("Ce document déjà existe dans la bibliothèque !");
        }
        else {
            let bookCreated = await bookToSave.save();
            return bookCreated;
        }
    }
    async totalBooksInfo() {
        const booksInfo = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksInfo.length; i++) {
            if (booksInfo[i].domain[0].label == 'Génie Informatique (IF)') {
                counter = counter + 1;
            }
        }
        let countBooks = counter;
        console.log("counter books-------------------", countBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Informatique (IF)" }).exec();
        let countUser = users.length;
        console.log("counter users -------------------", countUser);
        let calc = Math.floor(countUser / countBooks * 100);
        console.log("calcul------------", calc);
        return calc;
    }
    async totalBooksID() {
        const booksID = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksID.length; i++) {
            if (booksID[i].domain[0].label == 'Génie Industriel (ID)') {
                counter = counter + 1;
            }
        }
        return counter;
    }
    async totalBooksFN() {
        const booksFN = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksFN.length; i++) {
            if (booksFN[i].domain[0].label == 'Génie Financier (FN)') {
                counter = counter + 1;
            }
        }
        return counter;
    }
    async totalBooksGN() {
        const booksGN = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksGN.length; i++) {
            if (booksGN[i].domain[0].label == 'Ouvrages Généreaux (GN)') {
                counter = counter + 1;
            }
        }
        return counter;
    }
    async totalBooksEL() {
        const booksEL = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksEL.length; i++) {
            if (booksEL[i].domain[0].label == 'Génie Éléctrique (EL)') {
                counter = counter + 1;
            }
        }
        return counter;
    }
    async totalBooksCV() {
        const booksCV = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksCV.length; i++) {
            if (booksCV[i].domain[0].label == 'Génie Éléctrique (EL)') {
                counter = counter + 1;
            }
        }
        return counter;
    }
    async totalBooksSM() {
        const booksSM = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksSM.length; i++) {
            if (booksSM[i].domain[0].label == 'Génie Éléctrique (EL)') {
                counter = counter + 1;
            }
        }
        return counter;
    }
    async updateOneBook(idBook, bookObj) {
        bookObj.updatedAt = Date.now().toString();
        return await this.bookModel.findByIdAndUpdate(idBook, bookObj);
    }
    async deleteOneBook(idBook) {
        return await this.bookModel.findByIdAndDelete(idBook);
    }
    async findOneBookByCode(codeBook) {
        return await this.bookModel.findOne({ code: codeBook });
    }
};
BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(book_model_1.Book.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_interface_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map