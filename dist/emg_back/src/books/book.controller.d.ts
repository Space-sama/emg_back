import { Book } from './book.model';
import { UpdateBookDTO } from './../dtos/update-book.dto';
import { CreateBookDTO } from './../dtos/create-book.dto';
import { BookService } from './book.service';
export declare class BooksController {
    private readonly bookService;
    constructor(bookService: BookService);
    totalBooksInfo(): Promise<number>;
    totalBooksID(): Promise<number>;
    totalBooksFN(): Promise<number>;
    totalBooksGN(): Promise<number>;
    totalBooksEL(): Promise<number>;
    totalBooksCV(): Promise<number>;
    totalBooksSM(): Promise<number>;
    getAllBooks(): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getAllBooksByDispo(): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getOneBook(idBook: any): Promise<any>;
    getByFields(bookObj: UpdateBookDTO): Promise<Omit<Book & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addOneBook(bookObj: CreateBookDTO): Promise<any>;
    updateOneBook(id: any, bookObj: UpdateBookDTO): Promise<import("typeorm").UpdateResult>;
    deleteOneBook(id: String): Promise<import("typeorm").DeleteResult>;
}
