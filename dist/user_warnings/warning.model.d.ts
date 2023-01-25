import * as mongoose from 'mongoose';
export type WarningDocument = Warning & mongoose.Document;
export declare class Warning {
    f_name: string;
    l_name: string;
    cin: string;
    w_one: Date;
    w_two: Date;
    w_three: Date;
    tentative: number;
    createdAt: Date;
    updatedAt: Date;
    activateIn: Date;
}
export declare const WarningSchema: mongoose.Schema<Warning, mongoose.Model<Warning, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Warning>;
