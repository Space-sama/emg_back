import * as mongoose from 'mongoose';
export type AdminDocument = Admin & mongoose.Document;
export declare class Admin {
    firstName: string;
    lastName: string;
    email: string;
    pwd: string;
    track: string;
    profession: string;
    createdAt: Date;
}
export declare const AdminSchema: mongoose.Schema<Admin, mongoose.Model<Admin, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Admin>;
