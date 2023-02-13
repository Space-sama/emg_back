import { ParetoBookService } from './pareto_book.service';
export declare class ParetoBooksController {
    private readonly paretoBookService;
    constructor(paretoBookService: ParetoBookService);
    getAllParetoBooks(): Promise<(import("./pareto_book.model").Pareto_Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
