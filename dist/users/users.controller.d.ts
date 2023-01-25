/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './user.service';
import { CreateUserDTO } from 'src/dtos/create-users.dto';
import { UpdateUserDTO } from 'src/dtos/update-users.dto';
import { User } from './user.model';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    sayHello(): Promise<any>;
    all(): Promise<User[]>;
    alreadyIssued(): Promise<Number>;
    alreadyIssuedCivil(): Promise<any>;
    alreadyIssuedInfo(): Promise<any>;
    alreadyIssuedID(): Promise<any>;
    alreadyIssuedEL(): Promise<any>;
    alreadyIssuedSM(): Promise<any>;
    alreadyIssuedFN(): Promise<any>;
    alreadyIssuedGN(): Promise<any>;
    getWhenShouldReturnBook(): Promise<void>;
    getAll(): Promise<User[]>;
    getStudents(): Promise<User[]>;
    getProfs(): Promise<User[]>;
    getAdministratif(): Promise<User[]>;
    getHistory(): Promise<User[]>;
    TimeToreturnBook(): Promise<any>;
    getOneUser(idUser: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateToReturned(idUser: string): Promise<void>;
    addOneUser(userObj: CreateUserDTO): Promise<User>;
    addOneUserByCIN(userObj: CreateUserDTO): Promise<User>;
    updateOneUser(id: string, userObj: UpdateUserDTO): Promise<User>;
    deleteOneUser(id: String): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
