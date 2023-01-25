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
exports.CategoriesController = void 0;
const category_info_validation_pipe_1 = require("./../PipeValidation/category-info-validation.pipe");
const update_category_dto_1 = require("./../dtos/update-category.dto");
const create_category_dto_1 = require("./../dtos/create-category.dto");
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
let CategoriesController = class CategoriesController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllCatgories() {
        return this.categoryService.getAllCategories();
    }
    getOneCategory(idCateg) {
        return this.categoryService.getOneCategory(idCateg);
    }
    addOneCategory(categoryObj) {
        return this.categoryService.addOneCategory(categoryObj);
    }
    async updateOneCategory(id, categObj) {
        return this.categoryService.updateOneCategory(id, categObj);
    }
    async deleteOneCategory(id) {
        return await this.categoryService.deleteOneCategory(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAllCatgories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getOneCategory", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(category_info_validation_pipe_1.CategoryValidationPipes),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "addOneCategory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_category_dto_1.UpdateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateOneCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteOneCategory", null);
CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=category.controller.js.map