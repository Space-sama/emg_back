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
exports.CategoryService = void 0;
const category_model_1 = require("./category.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getAllCategories() {
        return await this.categoryModel.find();
    }
    getOneCategory(idCateg) {
        return this.categoryModel.findOne({ _id: idCateg }).exec();
    }
    async addOneCategory(categoryObj) {
        let categToSave = new this.categoryModel({
            label: categoryObj.label,
            status: categoryObj.status,
            createdAt: Date.now(),
        });
        let categCreated = await categToSave.save();
        return categCreated;
    }
    async updateOneCategory(idCateg, categObj) {
        categObj.updatedAt = Date.now().toString();
        return await this.categoryModel.findByIdAndUpdate(idCateg, categObj);
    }
    async deleteOneCategory(idCateg) {
        return await this.categoryModel.findByIdAndDelete(idCateg);
    }
    async findOneCategByCode(labelCateg) {
        return await this.categoryModel.findOne({ code: labelCateg });
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(category_model_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map