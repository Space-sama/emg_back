import { Category } from './../categories/category.model';
import * as mongoose from 'mongoose';
export type Book_Req_Document = Book_Req & mongoose.Document;
export declare class Book_Req {
    nameBook: string;
    author: string;
    pages: number;
    faculty: string;
    bookType: string;
    status: string;
    availibility: string;
    applicant: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    domain: Category;
}
export declare const Book_Req_Schema: mongoose.Schema<Book_Req, mongoose.Model<Book_Req, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book_Req>;
