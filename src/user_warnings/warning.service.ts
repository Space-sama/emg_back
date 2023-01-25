import { Cron, CronExpression } from '@nestjs/schedule/dist';
import { UpdateWarningDTO } from './../dtos/update_warning.dto';
import { CreateWarningDTO } from './../dtos/create_warning.dto';
import { Warning, WarningDocument } from './warning.model';
import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import * as moment from 'moment';

@Injectable()
export class WarningService {

    constructor(@InjectModel(Warning.name) private warningModel: Model<WarningDocument>){

    }
     
    async getAllWarnings(){
        const allWarnings = await this.warningModel.find({}).exec();
        return allWarnings;
    }

    async addWarning(warningObj:CreateWarningDTO):Promise<Warning> {
        let warningToSave = new this.warningModel({
            f_name: warningObj.f_name,
            l_name: warningObj.l_name,
            cin: warningObj.cin,
            w_one: "",
            w_two: "",
            w_three: "",
            tentative: warningObj.tentative,
            createdAt: Date.now(),
            updatedAt: null,
            activateIn: null,
        });
        let userCreated = await warningToSave.save();
        return userCreated;
    }

    async updateWarning(idWarn, warnObj:UpdateWarningDTO):Promise<Warning>{
        warnObj.updatedAt = Date.now().toString();
        return  await this.warningModel.findByIdAndUpdate(idWarn, warnObj);
    }

    async deleteWarning(id){
        return await this.warningModel.findByIdAndDelete(id);
    }

    async findByCin(cin: string){
        return await this.warningModel.findOne({"cin": cin}).exec();
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async ActivateUserAfterYear():Promise<any>{
        let allDesactivatedWarnings =  await this.warningModel.find({"tentative": 3}).exec();
        let now = moment().startOf('day');
        if(allDesactivatedWarnings.length>0){
            for(let i=0;i<allDesactivatedWarnings.length;i++){
                if(moment(allDesactivatedWarnings[i].activateIn).add('days') < now){
                    console.log("warning update founded ", allDesactivatedWarnings[i].cin);
                    await this.warningModel.findByIdAndUpdate({_id: allDesactivatedWarnings[i]._id},
                         { "$set": {
                            "tentative": 0,
                            "w_one": null,
                            "w_two":  null,
                            "w_three": null,
                            "updatedAt": moment().startOf('day'),
                            "activateIn": null,
                         }}).exec();
                }else{
                    console.log("Not > of one year yet !");
                }
            }
        }else{
            console.log("Warnings to update for years not founded !");
        }
    }
}
