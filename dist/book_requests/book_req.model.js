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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book_Req_Schema = exports.Book_Req = void 0;
const category_model_1 = require("./../categories/category.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Book_Req = class Book_Req {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "nameBook", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Book_Req.prototype, "pages", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "faculty", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "bookType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['Active', 'Inactive'] }),
    __metadata("design:type", String)
], Book_Req.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['purchased', 'in_progress'] }),
    __metadata("design:type", String)
], Book_Req.prototype, "availibility", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "applicant", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book_Req.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Book_Req.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Book_Req.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]),
    __metadata("design:type", category_model_1.Category)
], Book_Req.prototype, "domain", void 0);
Book_Req = __decorate([
    (0, mongoose_1.Schema)()
], Book_Req);
exports.Book_Req = Book_Req;
exports.Book_Req_Schema = mongoose_1.SchemaFactory.createForClass(Book_Req);
//# sourceMappingURL=book_req.model.js.map