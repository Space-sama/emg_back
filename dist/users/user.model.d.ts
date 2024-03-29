import { Book } from './../books/book.model';
import * as mongoose from 'mongoose';
export type UserDocument = User & mongoose.Document;
export declare class User {
    firstName: string;
    lastName: string;
    CIN: string;
    sexe: string;
    profession: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    dateIssuedBook: Date;
    dateRestitution: Date;
    forTimeOf: Number;
    daysLeft: Number;
    shouldReturn: boolean;
    isReturned: boolean;
    dateReturned: Date;
    hist_Book: string;
    hist_ISBN: string;
    hist_ID: string;
    hist_LOC: string;
    hist_Domain: string;
    tentative: number;
    activateIn: Date;
    book: Book[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
