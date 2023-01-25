import { Book_Req_Service } from './book_req.service';
import { CreateReqBookDTO } from 'src/dtos/create_book_req';
import { UpdateReqBookDTO } from 'src/dtos/update_book_req';
export declare class Books_Req_Controller {
    private readonly book_req_service;
    constructor(book_req_service: Book_Req_Service);
    getAllBooks_Req(): Promise<Omit<import("./book_req.model").Book_Req & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getAllBooks_Req_Purchased(): Promise<Omit<import("./book_req.model").Book_Req & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getOneBook_Req(idBook: any): Promise<any>;
    addOneBook(bookObj: CreateReqBookDTO): Promise<any>;
    updateOneBook(id: any, bookObj: UpdateReqBookDTO): Promise<import("typeorm").UpdateResult>;
    updateAvailibility(id: any): Promise<import("./book_req.model").Book_Req & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateAvailibility_2(id: any): Promise<import("./book_req.model").Book_Req & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOneBook(id: String): Promise<import("typeorm").DeleteResult>;
}
