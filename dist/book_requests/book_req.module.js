"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book_Req_Module = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const book_req_controller_1 = require("./book_req.controller");
const book_req_model_1 = require("./book_req.model");
const book_req_service_1 = require("./book_req.service");
let Book_Req_Module = class Book_Req_Module {
};
Book_Req_Module = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: book_req_model_1.Book_Req.name, schema: book_req_model_1.Book_Req_Schema }
            ]),
        ],
        controllers: [book_req_controller_1.Books_Req_Controller],
        providers: [book_req_service_1.Book_Req_Service],
        exports: [book_req_service_1.Book_Req_Service],
    })
], Book_Req_Module);
exports.Book_Req_Module = Book_Req_Module;
//# sourceMappingURL=book_req.module.js.map