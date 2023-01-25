import { AdminService } from './admin.service';
import { Admin } from './admin.model';
import { CreateAdminDTO } from 'src/dtos/create_admin.dto';
import { UpdateAdminDTO } from 'src/dtos/update_admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AdminController {
    private readonly adminService;
    private readonly jwtService;
    constructor(adminService: AdminService, jwtService: JwtService);
    getAuthenticated(req: Request): Promise<Admin & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOne(id: string): Promise<Admin & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAll(): Promise<Admin[]>;
    addOne(obj: CreateAdminDTO): Promise<Admin>;
    updateOne(id: string, adminObj: UpdateAdminDTO): Promise<Admin>;
    deleteOne(id: String): Promise<Admin & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(loginUser: CreateAdminDTO, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
