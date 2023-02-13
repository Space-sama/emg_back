import * as mongoose from 'mongoose';
export type BookParetoDocument = Pareto_Book & mongoose.Document;
export declare class Pareto_Book {
    nameBook: string;
    identifiant: string;
    location: string;
    counter: number;
    cumulEmprunt: number;
    pourcentage: number;
    cumulPourcentage: number;
    bookPourcentage: number;
    domain: string;
}
export declare const ParetoBookSchema: mongoose.Schema<Pareto_Book, mongoose.Model<Pareto_Book, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Pareto_Book>;
