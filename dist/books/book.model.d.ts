import { Category } from './../categories/category.model';
import * as mongoose from 'mongoose';
export type BookDocument = Book & mongoose.Document;
export declare class Book {
    nameBook: string;
    identifiant: string;
    location: string;
    ISBN: string;
    author: string;
    pages: number;
    faculty: string;
    edition: Date;
    editor: string;
    bookType: string;
    counter: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    isIssued: Boolean;
    shouldBeReturned: Boolean;
    issuedByFirstName: String;
    issuedByLastName: String;
    keyWords: [];
    domain: Category;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book>;
