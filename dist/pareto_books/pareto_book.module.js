"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParetoBookModule = void 0;
const pareto_book_controller_1 = require("./pareto_book.controller");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pareto_book_model_1 = require("./pareto_book.model");
const pareto_book_service_1 = require("./pareto_book.service");
let ParetoBookModule = class ParetoBookModule {
};
ParetoBookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: pareto_book_model_1.Pareto_Book.name, schema: pareto_book_model_1.ParetoBookSchema },
            ]),
        ],
        controllers: [pareto_book_controller_1.ParetoBooksController],
        providers: [pareto_book_service_1.ParetoBookService],
        exports: [pareto_book_service_1.ParetoBookService],
    })
], ParetoBookModule);
exports.ParetoBookModule = ParetoBookModule;
//# sourceMappingURL=pareto_book.module.js.map