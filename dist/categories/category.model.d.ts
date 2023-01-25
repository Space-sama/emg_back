import * as mongoose from 'mongoose';
export type CategoryDocument = Category & mongoose.Document;
export declare class Category {
    label: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category>;
