"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const pareto_book_module_1 = require("./pareto_books/pareto_book.module");
const warning_module_1 = require("./user_warnings/warning.module");
const category_module_1 = require("./categories/category.module");
const book_module_1 = require("./books/book.module");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const schedule_1 = require("@nestjs/schedule");
const book_req_module_1 = require("./book_requests/book_req.module");
const admin_module_1 = require("./admin/admin.module");
const nest_sendgrid_1 = require("@anchan828/nest-sendgrid");
require("dotenv").config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_sendgrid_1.SendGridModule.forRoot({
                apikey: "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",
            }),
            users_module_1.UsersModule,
            book_module_1.BookModule,
            category_module_1.CategoryModule,
            book_req_module_1.Book_Req_Module,
            admin_module_1.AdminModule,
            warning_module_1.WarningModule,
            pareto_book_module_1.ParetoBookModule,
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ljs3d.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`),
            schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map