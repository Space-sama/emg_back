import { AdminService } from './admin/admin.service';
import { Strategy } from 'passport-local';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AdminService);
    validate(email: string): Promise<any>;
}
export {};
