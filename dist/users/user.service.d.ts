import { WarningDocument } from './../user_warnings/warning.model';
import { WarningService } from './../user_warnings/warning.service';
import { BookDocument } from './../books/book.model';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { UpdateUserDTO } from 'src/dtos/update-users.dto';
import { CreateUserDTO } from 'src/dtos/create-users.dto';
import { SendGridService } from "@anchan828/nest-sendgrid";
export declare class UsersService {
    private userModel;
    private bookModel;
    private warningModel;
    private readonly warningService;
    private readonly sandGrid;
    constructor(userModel: Model<UserDocument>, bookModel: Model<BookDocument>, warningModel: Model<WarningDocument>, warningService: WarningService, sandGrid: SendGridService);
    send(): Promise<"error" | "success">;
    getAllUsers(): Promise<Omit<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    users(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    booksAlreadyIssued(): Promise<number>;
    booksAlreadyIssuedCivilEng(): Promise<number>;
    booksAlreadyIssuedIDEng(): Promise<number>;
    booksAlreadyIssuedEL(): Promise<number>;
    booksAlreadyIssuedInfoEng(): Promise<number>;
    booksAlreadyIssuedSM(): Promise<number>;
    booksAlreadyIssuedFN(): Promise<number>;
    booksAlreadyIssuedGN(): Promise<number>;
    getStudents(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProfesseurs(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getAdministrative(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getOneUser(idUser: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    bookReturned(idUser: string): Promise<void>;
    getAllHistoryUsers(): Promise<Omit<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getByShouldReturnedTheBook(): Promise<Omit<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addUserByCIN(userObj: CreateUserDTO): Promise<any>;
    addOneUser(userObj: CreateUserDTO): Promise<any>;
    updateOneUser(idUser: any, userObj: UpdateUserDTO): Promise<User>;
    deleteOneUser(id: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getWhenShouldReturnBook(): Promise<void>;
    findOneUser(name: string): Promise<any>;
}
