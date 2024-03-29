"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModule = void 0;
const pareto_book_model_1 = require("./../pareto_books/pareto_book.model");
const book_model_1 = require("./book.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const book_service_1 = require("./book.service");
const book_controller_1 = require("./book.controller");
const user_model_1 = require("../users/user.model");
let BookModule = class BookModule {
};
BookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: book_model_1.Book.name, schema: book_model_1.BookSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: pareto_book_model_1.Pareto_Book.name, schema: pareto_book_model_1.ParetoBookSchema },
            ]),
        ],
        controllers: [book_controller_1.BooksController],
        providers: [book_service_1.BookService],
        exports: [book_service_1.BookService],
    })
], BookModule);
exports.BookModule = BookModule;
//# sourceMappingURL=book.module.js.map