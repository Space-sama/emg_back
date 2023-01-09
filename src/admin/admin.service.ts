import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.model';
import { CreateAdminDTO } from 'src/dtos/create_admin.dto';
import { UpdateAdminDTO } from 'src/dtos/update_admin.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {

    constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>){

    }
     
    async getAll(){
       const allAdmin = await this.adminModel.find({}).exec();
       return allAdmin;
    }

    async getOne(id:string){
        return await this.adminModel.findById({_id: id}).exec();
    }

    async getOneByMail(email:string){
        return await this.adminModel.findOne({email: email}).exec();
    }

    

    async register(adminObj:CreateAdminDTO):Promise<Admin> {
        const hashedPwd = await bcrypt.hash(adminObj.pwd, 12); 
        let adminToSave = new this.adminModel({
            firstName: adminObj.firstName,
            lastName: adminObj.lastName,
            profession: adminObj.profession,
            email: adminObj.email,
            pwd: hashedPwd,
            track: adminObj.pwd,
            createdAt: Date.now()
        });
        let adminCreated = await adminToSave.save();
        return adminCreated;
    }

    async update(id, adminObj:UpdateAdminDTO):Promise<Admin>{
        return  await this.adminModel.findByIdAndUpdate(id, adminObj);
    }

    async deleteOne(id){
        let findAdmin = await this.adminModel.findById(id);
        return await this.adminModel.findByIdAndDelete(id);
    }
}
