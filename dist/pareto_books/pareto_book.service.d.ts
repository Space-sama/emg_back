import { Pareto_Book, BookParetoDocument } from './pareto_book.model';
import { Model } from 'mongoose';
export declare class ParetoBookService {
    private paretoBookModel;
    constructor(paretoBookModel: Model<BookParetoDocument>);
    getAllParetoBooks(): Promise<(Pareto_Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
