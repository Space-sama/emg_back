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
exports.UsersService = void 0;
const warning_model_1 = require("./../user_warnings/warning.model");
const warning_service_1 = require("./../user_warnings/warning.service");
const book_model_1 = require("./../books/book.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("./user.model");
const moment = require("moment");
const dist_1 = require("@nestjs/schedule/dist");
const nest_sendgrid_1 = require("@anchan828/nest-sendgrid");
let UsersService = class UsersService {
    constructor(userModel, bookModel, warningModel, warningService, sandGrid) {
        this.userModel = userModel;
        this.bookModel = bookModel;
        this.warningModel = warningModel;
        this.warningService = warningService;
        this.sandGrid = sandGrid;
    }
    async send() {
        let s = await this.sandGrid.send({
            to: 'hawkander.666@gmail.com',
            from: 'oussama.elharmali@emg.ac.ma',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        });
        if (!s) {
            return "error";
        }
        return "success";
    }
    async getAllUsers() {
        const allUsers = await this.userModel.find({ "isReturned": false, "dateReturned": null }).populate('book').exec();
        return allUsers;
    }
    async users() {
        const users = await this.userModel.find({}).exec();
        return users;
    }
    async booksAlreadyIssued() {
        const users = await this.userModel.find({ "isReturned": true, "shouldReturn": true, "daysLeft": 0 }).exec();
        return users.length;
    }
    async booksAlreadyIssuedCivilEng() {
        const users = await this.userModel.find({
            "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Civil (CV)"
        }).exec();
        return users.length;
    }
    async booksAlreadyIssuedIDEng() {
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Industriel (ID)" }).exec();
        return users.length;
    }
    async booksAlreadyIssuedEL() {
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Éléctrique (EL)" }).exec();
        return users.length;
    }
    async booksAlreadyIssuedInfoEng() {
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Informatique (IF)" }).exec();
        return users.length;
    }
    async booksAlreadyIssuedSM() {
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Stratégie - Management (SM)" }).exec();
        return users.length;
    }
    async booksAlreadyIssuedFN() {
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Financier (FN)" }).exec();
        return users.length;
    }
    async booksAlreadyIssuedGN() {
        const users = await this.userModel.find({ "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Ouvrages Généreaux (GN)" }).exec();
        return users.length;
    }
    async getStudents() {
        return await this.userModel.find({ "profession": "Etudiant" }).exec();
    }
    async getProfesseurs() {
        return await this.userModel.find({ "profession": "Professeur" }).exec();
    }
    async getAdministrative() {
        return await this.userModel.find({ "profession": "Administratif" }).exec();
    }
    async getOneUser(idUser) {
        return await this.userModel.findOne({ _id: idUser }).populate('book').exec();
    }
    async bookReturned(idUser) {
        try {
            let getOne = await this.userModel.findOne({ "_id": idUser }).populate("book").exec();
            await this.bookModel.findByIdAndUpdate({ "_id": getOne.book[0]["_id"] }, { "$set": {
                    "isIssued": false, "shouldBeReturned": false,
                    "issuedByFirstName": "", "issuedByLastName": ""
                }
            });
            let findBook = await this.bookModel.findOne({ "_id": getOne.book[0]["_id"] }).populate("domain").exec();
            await this.userModel.findByIdAndUpdate({ "_id": idUser }, { "$set": {
                    "book": [],
                    "isReturned": true,
                    "daysLeft": 0,
                    "dateReturned": moment().startOf('day').add(1, 'hours'),
                    "hist_Book": getOne.book[0]["nameBook"],
                    "hist_ISBN": getOne.book[0]["ISBN"],
                    "hist_ID": getOne.book[0]["identifiant"],
                    "hist_LOC": getOne.book[0]["location"],
                    "hist_Domain": findBook.domain[0]["label"],
                } }).exec();
            let findUpdatedUser = await this.userModel.findOne({ "_id": idUser }).exec();
            console.log("date returned ", findUpdatedUser.dateReturned, "date restitution ", findUpdatedUser.dateRestitution);
            if (findUpdatedUser.dateReturned > findUpdatedUser.dateRestitution) {
                console.log("Avertissement.....");
                let editWarningUser = await this.warningService.findByCin(findUpdatedUser.CIN);
                console.log("get one warning founded ", editWarningUser);
                if (editWarningUser && editWarningUser.tentative == 0) {
                    console.log("Tetative === ", editWarningUser.tentative);
                    await this.warningModel.updateOne({ "_id": editWarningUser._id }, {
                        "$set": {
                            "tentative": 1,
                            "w_one": moment().startOf('day'),
                            "w_two": null,
                            "w_three": null,
                            "updatedAt": moment().startOf('day'),
                        }
                    }).exec();
                    await this.userModel.findByIdAndUpdate({ "_id": idUser }, { "$set": {
                            tentative: 1,
                        } }).exec();
                }
                else if (editWarningUser && editWarningUser.tentative == 1) {
                    console.log("Tetative === ", editWarningUser.tentative);
                    await this.warningModel.updateOne({ "_id": editWarningUser._id }, {
                        "$set": {
                            "tentative": 2,
                            "w_two": moment().startOf('day'),
                            "w_three": null,
                            "updatedAt": moment().startOf('day'),
                        }
                    }).exec();
                    await this.userModel.findByIdAndUpdate({ "_id": idUser }, { "$set": {
                            tentative: 2,
                        } }).exec();
                }
                else if (editWarningUser && editWarningUser.tentative == 2) {
                    console.log("Tetative === ", editWarningUser.tentative);
                    await this.warningModel.updateOne({ "_id": editWarningUser._id }, {
                        "$set": {
                            "tentative": 3,
                            "w_three": moment().startOf('day'),
                            "updatedAt": moment().startOf('day'),
                            "activateIn": moment().startOf('day').add(1, 'years'),
                        }
                    }).exec();
                    await this.userModel.findByIdAndUpdate({ "_id": idUser }, { "$set": {
                            tentative: 3,
                            activateIn: moment().startOf('day').add(1, 'years')
                        } }).exec();
                }
                else {
                    console.log("tentative blocked...");
                }
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllHistoryUsers() {
        const allUsers = await this.userModel.find({ "isReturned": true, "shouldReturn": true }).populate('book').exec();
        return allUsers;
    }
    async getByShouldReturnedTheBook() {
        const allUsers = await this.userModel.find({ "isIssued": true, "shouldReturn": true, "isReturned": false }).populate('book').exec();
        return await allUsers;
    }
    async addUserByCIN(userObj) {
        let now = moment().startOf('day');
        let findByCin = await this.userModel.find({
            "CIN": userObj.CIN,
            "daysLeft": 0,
            "shouldReturn": true,
            "isReturned": true,
        }).exec();
        if (findByCin.length == 0) {
            return ("Cet utilisateur n'existe pas !");
        }
        let userToSave = new this.userModel({
            firstName: findByCin[0].firstName,
            lastName: findByCin[0].lastName,
            CIN: userObj.CIN,
            sexe: findByCin[0].sexe,
            profession: findByCin[0].profession,
            phone: findByCin[0].phone,
            email: findByCin[0].email,
            createdAt: Date.now(),
            updatedAt: "",
            status: "Active",
            dateIssuedBook: Date.now() + 1,
            dateRestitution: moment(userObj.dateRestitution).add(1, 'hours'),
            isReturned: false,
            dateReturned: null,
            tentative: 0,
            activateIn: null,
            book: userObj.book,
            daysLeft: moment.duration(moment(userObj.dateRestitution).diff(now)).asDays(),
            forTimeOf: moment.duration(moment(userObj.dateRestitution).add('days').diff(now)).asDays(),
        });
        let findWarningUser = await this.warningService.findByCin(userToSave.CIN);
        if (findWarningUser) {
            console.log("warning ", findWarningUser);
            if (findWarningUser.tentative == 3) {
                console.log("tentative equal// ", findWarningUser.tentative);
                return ("Cet utilisateur a dépassé le nombre d'avertissements !");
            }
            else {
                console.log("tentative not 3 //");
            }
        }
        let findAlreadyProgressIssued_twoBooks = await this.userModel.find({
            "CIN": userToSave.CIN,
            "isReturned": false, "dateReturned": null,
        }).exec();
        if (findAlreadyProgressIssued_twoBooks.length == 2) {
            console.log("This user is already in progress with an issued book !!!");
            return ("Cet utilisateur à déjà emprunté deux documents !");
        }
        else {
            let userCreated = await userToSave.save();
            await this.bookModel.findByIdAndUpdate({ "_id": userCreated.book[0] }, { "$set": { "isIssued": true,
                    "issuedByFirstName": findByCin[0].firstName, "issuedByLastName": findByCin[0].lastName,
                    "counter": 1 } }).exec();
            if (!findWarningUser) {
                let newWarning = new this.warningModel({
                    f_name: userCreated.firstName,
                    l_name: userCreated.lastName,
                    cin: userCreated.CIN,
                    tentative: 0,
                    w_one: "",
                    w_two: "",
                    w_three: "",
                    createdAt: Date.now(),
                    updatedAt: null,
                });
                await this.warningService.addWarning(newWarning);
            }
            return userCreated;
        }
    }
    async addOneUser(userObj) {
        let now = moment().startOf('day');
        let userToSave = new this.userModel({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            CIN: userObj.CIN,
            sexe: userObj.sexe,
            profession: userObj.profession,
            phone: userObj.phone,
            email: userObj.email,
            createdAt: Date.now(),
            updatedAt: "",
            status: "Active",
            dateIssuedBook: Date.now() + 1,
            dateRestitution: moment(userObj.dateRestitution).add(1, 'hours'),
            isReturned: false,
            dateReturned: null,
            tentative: 0,
            activateIn: null,
            book: userObj.book,
            daysLeft: moment.duration(moment(userObj.dateRestitution).diff(now)).asDays(),
            forTimeOf: moment.duration(moment(userObj.dateRestitution).add('days').diff(now)).asDays(),
        });
        let findWarningUser = await this.warningService.findByCin(userToSave.CIN);
        if (findWarningUser) {
            console.log("warning ", findWarningUser);
            if (findWarningUser.tentative == 3) {
                console.log("tentative equal ", findWarningUser.tentative);
                return ("Cet utilisateur a dépassé le nombre d'avertissements !");
            }
            else {
                console.log("tentative not 3");
            }
        }
        let findAlreadyProgressIssued_twoBooks = await this.userModel.find({
            "CIN": userToSave.CIN,
            "isReturned": false, "dateReturned": null,
        }).exec();
        if (findAlreadyProgressIssued_twoBooks.length == 2) {
            console.log("This user is already in progress with an issued book !!!");
            return ("Cet utilisateur à déjà emprunté deux documents !");
        }
        else {
            let userCreated = await userToSave.save();
            await this.bookModel.findByIdAndUpdate({ "_id": userCreated.book[0] }, { "$set": { "isIssued": true,
                    "issuedByFirstName": userObj.firstName, "issuedByLastName": userObj.lastName, "counter": 1 } }).exec();
            if (!findWarningUser) {
                let newWarning = new this.warningModel({
                    f_name: userCreated.firstName,
                    l_name: userCreated.lastName,
                    cin: userCreated.CIN,
                    tentative: 0,
                    w_one: "",
                    w_two: "",
                    w_three: "",
                    createdAt: Date.now(),
                    updatedAt: null,
                });
                await this.warningService.addWarning(newWarning);
            }
            return userCreated;
        }
    }
    async updateOneUser(idUser, userObj) {
        userObj.updatedAt = Date.now().toString();
        return await this.userModel.findByIdAndUpdate(idUser, userObj);
    }
    async deleteOneUser(id) {
        let findUser = await this.userModel.findById(id);
        console.log("deleting ...... ", findUser.book[0]);
        await this.bookModel.findByIdAndUpdate({ "_id": findUser.book[0] }, { "$set": { "isIssued": false } }).exec();
        await this.userModel.findByIdAndUpdate({ "_id": id }, { "$set": { "shouldReturn": false,
                "issuedByFirstName": "", "issuedByLastName": "" } }).exec();
        return await this.userModel.findByIdAndDelete(id);
    }
    async getWhenShouldReturnBook() {
        const allUsers = await this.userModel.find({ "shouldReturn": false }).exec();
        for (let i = 0; i < allUsers.length; i++) {
            console.log("inside for loop..");
            let now = moment().startOf('day');
            if (allUsers[i].daysLeft == 0 || moment(allUsers[i].dateRestitution).add('days') < now) {
                console.log("i saw number 0..");
                await this.userModel.findByIdAndUpdate({ _id: allUsers[i]._id }, { "$set": { "shouldReturn": true } }).exec();
                await this.bookModel.findByIdAndUpdate({ _id: allUsers[i].book[0] }, { "$set": { "shouldBeReturned": true } }).exec();
                console.log("Succeeeeess...");
            }
            else {
                console.log("i will - a day here !");
                console.log("days left befor updating ", allUsers[i].daysLeft);
                let now = moment().startOf('day');
                let restitution = moment(allUsers[i].dateRestitution).add(-1, "hours");
                let left = moment.duration(restitution.diff(now)).asDays();
                console.log("now", now);
                console.log("restitu", restitution);
                console.log("left -------------", left);
                allUsers[i].daysLeft = left;
                await this.userModel.findByIdAndUpdate({ _id: allUsers[i]._id }, { "$set": { "daysLeft": allUsers[i].daysLeft } }).exec();
                console.log("days left after updating ", allUsers[i].daysLeft);
            }
        }
    }
    async findOneUser(name) {
        return await this.userModel.findOne({ firstName: name });
    }
};
__decorate([
    (0, dist_1.Cron)(dist_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "getWhenShouldReturnBook", null);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(book_model_1.Book.name)),
    __param(2, (0, mongoose_1.InjectModel)(warning_model_1.Warning.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        warning_service_1.WarningService,
        nest_sendgrid_1.SendGridService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map