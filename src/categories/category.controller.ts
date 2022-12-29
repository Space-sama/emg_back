import { CategoryValidationPipes } from './../PipeValidation/category-info-validation.pipe';
import { UpdateCategoryDTO } from './../dtos/update-category.dto';
import { CreateCategoryDTO } from './../dtos/create-category.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CategoryService } from './category.service';


@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService:CategoryService){

    }
    
    @Get()
    getAllCatgories(){
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    getOneCategory(@Param('id') idCateg){
        return this.categoryService.getOneCategory(idCateg);
    }

    @Post()
    @UsePipes(CategoryValidationPipes)
    addOneCategory(@Body() categoryObj:CreateCategoryDTO):Promise<any>{
        return this.categoryService.addOneCategory(categoryObj);
    }

    @Put(':id')
    async updateOneCategory(@Param('id') id, @Body() categObj:UpdateCategoryDTO){
        return this.categoryService.updateOneCategory(id, categObj);
    }

    @Delete(':id')
    async deleteOneCategory(@Param('id') id:String){
        return await this.categoryService.deleteOneCategory(id);
    }
}
