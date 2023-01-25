import { UpdateWarningDTO } from './../dtos/update_warning.dto';
import { CreateWarningDTO } from './../dtos/create_warning.dto';
import { Warning, WarningDocument } from './warning.model';
import { Model } from 'mongoose';
export declare class WarningService {
    private warningModel;
    constructor(warningModel: Model<WarningDocument>);
    getAllWarnings(): Promise<(Warning & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addWarning(warningObj: CreateWarningDTO): Promise<Warning>;
    updateWarning(idWarn: any, warnObj: UpdateWarningDTO): Promise<Warning>;
    deleteWarning(id: any): Promise<Warning & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByCin(cin: string): Promise<Warning & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    ActivateUserAfterYear(): Promise<any>;
}
