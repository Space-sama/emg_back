import { UpdateWarningDTO } from './../dtos/update_warning.dto';
import { CreateWarningDTO } from './../dtos/create_warning.dto';
import { Warning } from './warning.model';
import { WarningService } from './warning.service';
export declare class WarningController {
    private readonly warnService;
    constructor(warnService: WarningService);
    all(): Promise<Warning[]>;
    findWarnings(): Promise<Warning[]>;
    addOneUser(warnObj: CreateWarningDTO): Promise<Warning>;
    editWarning(id: string, warnObj: UpdateWarningDTO): Promise<Warning>;
    deleteOneUser(id: String): Promise<Warning & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByCIN(cin: string): Promise<Warning & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
