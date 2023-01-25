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
const user_model_1 = require("./../users/user.model");
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
    async usedDocuments() {
        const usedDocs = await this.bookModel.find({ "counter": 1 }).populate('domain').exec();
        return usedDocs;
    }
    async unusedDocs() {
        const unusedDocs = await this.bookModel.find({ "counter": 0 }).populate('domain').exec();
        return unusedDocs;
    }
    async getHistoryBookByNameInfo() {
        let dataInfo = [{}];
        let all = await this.bookModel.find({
            'nameBook': {
                $in: [
                    'Les bases algorithmiques'
                ]
            }
        }).exec();
        console.log("count -------", all.length);
        let infoHistoryBooks = await this.userModel.find({ "isReturned": true, "shouldReturn": true,
            "daysLeft": 0, "hist_Domain": "Génie Informatique (IF)" });
        for (let y = 0; y < infoHistoryBooks.length; y++) {
            let allBooksByName = await this.bookModel.find({ "nameBook": infoHistoryBooks[y].hist_Book }).exec();
            let count = allBooksByName.length;
            console.log("Count :", count);
            console.log("All :", all.length);
            let perInfo = count / all.length * 100;
            dataInfo.push({
                nameBook: infoHistoryBooks[y].hist_Book, percentage: perInfo, location: infoHistoryBooks[y].hist_LOC
            });
        }
        return dataInfo;
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
            counter: 0,
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
        let countAllInfoBooks = counter;
        console.log("counter books-------------------", countAllInfoBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Informatique (IF)" }).exec();
        let countBookIssuedInfo = users.length;
        console.log("counter users -------------------", countBookIssuedInfo);
        let calc = Math.floor(countBookIssuedInfo / countAllInfoBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
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
        let countAllIDBooks = counter;
        console.log("counter ID books-------------------", countAllIDBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Industriel (ID)" }).exec();
        let countBookIssuedID = users.length;
        console.log("counter users -------------------", countBookIssuedID);
        let calc = Math.floor(countBookIssuedID / countAllIDBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
        console.log("calcul------------", calc);
        return calc;
    }
    async totalBooksFN() {
        const booksFN = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksFN.length; i++) {
            if (booksFN[i].domain[0].label == 'Génie Financier (FN)') {
                counter = counter + 1;
            }
        }
        let countAllFNBooks = counter;
        console.log("counter FN books-------------------", countAllFNBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Financier (FN)" }).exec();
        let countBookIssuedFN = users.length;
        console.log("counter users fn-------------------", countBookIssuedFN);
        let calc = Math.floor(countBookIssuedFN / countAllFNBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
        console.log("calcul------------", calc);
        return calc;
    }
    async totalBooksGN() {
        const booksGN = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksGN.length; i++) {
            if (booksGN[i].domain[0].label == 'Ouvrages Généreaux (GN)') {
                counter = counter + 1;
            }
        }
        let countAllGNBooks = counter;
        console.log("counter GN books-------------------", countAllGNBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Ouvrages Généreaux (GN)" }).exec();
        let countBookIssuedGN = users.length;
        console.log("counter users GN-------------------", countBookIssuedGN);
        let calc = Math.floor(countBookIssuedGN / countAllGNBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
        console.log("calcul------------", calc);
        return calc;
    }
    async totalBooksEL() {
        const booksEL = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksEL.length; i++) {
            if (booksEL[i].domain[0].label == 'Génie Éléctrique (EL)') {
                counter = counter + 1;
            }
        }
        let countAllELBooks = counter;
        console.log("counter EL books-------------------", countAllELBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Éléctrique (EL)" }).exec();
        let countBookIssuedEL = users.length;
        console.log("counter users EL-------------------", countBookIssuedEL);
        let calc = Math.floor(countBookIssuedEL / countAllELBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
        console.log("calcul------------", calc);
        return calc;
    }
    async totalBooksCV() {
        const booksCV = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksCV.length; i++) {
            if (booksCV[i].domain[0].label == 'Génie Civil (CV)') {
                counter = counter + 1;
            }
        }
        let countAllCVBooks = counter;
        console.log("counter CV books-------------------", countAllCVBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Éléctrique (CV)" }).exec();
        let countBookIssuedCV = users.length;
        console.log("counter users CV-------------------", countBookIssuedCV);
        let calc = Math.floor(countBookIssuedCV / countAllCVBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
        console.log("calcul------------", calc);
        return calc;
    }
    async totalBooksSM() {
        const booksSM = await this.bookModel.find({}).populate('domain').exec();
        let counter = 0;
        for (let i = 0; i < booksSM.length; i++) {
            if (booksSM[i].domain[0].label == 'Stratégie - Management (SM)') {
                counter = counter + 1;
            }
        }
        let countAllSMBooks = counter;
        console.log("counter SM books-------------------", countAllSMBooks);
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Stratégie - Management (SM)" }).exec();
        let countBookIssuedSM = users.length;
        console.log("counter users SM-------------------", countBookIssuedSM);
        let calc = Math.floor(countBookIssuedSM / countAllSMBooks * 100);
        if (calc > 100) {
            calc = 100;
        }
        if (isNaN(calc)) {
            calc = 0;
        }
        if (calc < 0) {
            calc = 0;
        }
        console.log("calcul------------", calc);
        return calc;
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
    __param(1, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map