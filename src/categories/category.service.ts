import { Category, CategoryDocument } from './category.model';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, UpdateResult } from "typeorm";

@Injectable()
export class  CategoryService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){

    }
     
    async getAllCategories(){
       return await this.categoryModel.find();
    }

    getOneCategory(idCateg):Promise<any> {
        return this.categoryModel.findOne({_id: idCateg}).exec();
    }

    async addOneCategory(categoryObj){
         let categToSave = new this.categoryModel({
            label: categoryObj.label,
            status: categoryObj.status,
            createdAt: Date.now(),
        });
        let categCreated = await categToSave.save();
        return categCreated;
    }

    async updateOneCategory(idCateg, categObj):Promise<UpdateResult>{
        categObj.updatedAt = Date.now().toString();
        return await this.categoryModel.findByIdAndUpdate(idCateg, categObj);
    }

    async deleteOneCategory(idCateg):Promise<DeleteResult>{
        return await this.categoryModel.findByIdAndDelete(idCateg);
    }


    // Get one category by label
    public async findOneCategByCode(labelCateg: string): Promise<any>{
        return await this.categoryModel.findOne({code: labelCateg});
    }
}
