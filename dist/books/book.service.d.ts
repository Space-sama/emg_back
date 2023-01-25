import { UserDocument } from './../users/user.model';
import { Book, BookDocument } from './book.model';
import { Model } from 'mongoose';
import { DeleteResult, UpdateResult } from "typeorm";
export declare class BookService {
    private bookModel;
    private userModel;
    constructor(bookModel: Model<BookDocument>, userModel: Model<UserDocument>);
    getAllBooks(): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    usedDocuments(): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    unusedDocs(): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getHistoryBookByNameInfo(): Promise<any>;
    getAllBooksByDispo(): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getByFields(title: String, author: String, edition?: Date, editor?: String, label?: String): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getOneBook(idBook: any): Promise<any>;
    addOneBook(bookObj: any): Promise<(Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Ce document déjà existe dans la bibliothèque !">;
    totalBooksInfo(): Promise<number>;
    totalBooksID(): Promise<number>;
    totalBooksFN(): Promise<number>;
    totalBooksGN(): Promise<number>;
    totalBooksEL(): Promise<number>;
    totalBooksCV(): Promise<number>;
    totalBooksSM(): Promise<number>;
    updateOneBook(idBook: any, bookObj: any): Promise<UpdateResult>;
    deleteOneBook(idBook: any): Promise<DeleteResult>;
    findOneBookByCode(codeBook: string): Promise<any>;
}
