import { Book, BookDocument } from './../books/book.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { UpdateUserDTO } from 'src/dtos/update-users.dto';
import { CreateUserDTO } from 'src/dtos/create-users.dto';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule/dist';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>){

    }

    // @Cron(CronExpression.EVERY_5_SECONDS)
    async sayHello(){
        await console.log("helloo Oussama...");
    }
     
    async getAllUsers(){
       const allUsers = await this.userModel.find({"isReturned": false, "dateReturned": null}).populate('book').exec();
       return allUsers;
    }

    async getOneUser(idUser:string){
        return await this.userModel.findOne({_id: idUser}).populate('book').exec();
    }

    async bookReturned(idUser:string){
        try {
            let getOne = await this.userModel.findOne({"_id": idUser}).populate("book").exec();
        await this.bookModel.findByIdAndUpdate(
        {"_id": getOne.book[0]["_id"]}, {"$set": 
            {
                "isIssued": false, "shouldBeReturned": false, 
                "issuedByFirstName": "", "issuedByLastName": ""
            }
        });
        let findBook = await this.bookModel.findOne({"_id": getOne.book[0]["_id"]}).populate("domain").exec();

        await this.userModel.findByIdAndUpdate({"_id": idUser}, 
        { "$set": {
            "book": [], 
            "isReturned": true,
            "dateReturned": Date.now(),
            "hist_Book": getOne.book[0]["nameBook"],
            "hist_ISBN": getOne.book[0]["ISBN"],
            "hist_ID": getOne.book[0]["identifiant"],
            "hist_LOC": getOne.book[0]["location"],
            "hist_Domain": findBook.domain[0]["label"],
        }})
            .exec();
        } catch (error) {
            throw new Error(error);
        }
        
    }

    async getAllHistoryUsers(){
        const allUsers = await this.userModel.find({"isReturned": true, "shouldReturn": true}).populate('book').exec();
        return allUsers;
     }


    // Get users that should return the book.
    async getByShouldReturnedTheBook(){
        const allUsers = await this.userModel.find({ "isIssued": true , "shouldReturn": true, "isReturned": false}).populate('book').exec();
        return await allUsers;
    }

    async addOneUser(userObj:CreateUserDTO):Promise<User> {
        let userToSave = new this.userModel({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            CIN: userObj.CIN,
            sexe: userObj.sexe,
            profession: userObj.profession,
            phone: userObj.phone,
            email: userObj.email,
            createdAt: Date.now(),
            updatedAt: "",
            status: userObj.status,
            dateIssuedBook: Date.now()+1,
            dateRestitution: moment(userObj.dateRestitution).add(1, 'days'),
            isReturned: false,
            dateReturned: null,
            book: userObj.book,
            // daysLeft: moment(userObj.dateRestitution).locale('fr').fromNow(),
            // Cron variant time
            daysLeft: moment(userObj.dateRestitution).add(1, 'days').date() - moment(Date.now()).add(1, 'days').date(),
            // fixed time
            forTimeOf: moment(userObj.dateRestitution).add(1, 'days').date() - moment(Date.now()).add(1, 'days').date(),
        });
        let userCreated = await userToSave.save();
        await this.bookModel.findByIdAndUpdate({"_id": userCreated.book[0]}, { "$set": { "isIssued": true, 
        "issuedByFirstName": userObj.firstName, "issuedByLastName": userObj.lastName}}).exec();
        // console.log("id book is :", userCreated.book[0]);
        return userCreated;
    }

    async updateOneUser(idUser, userObj:UpdateUserDTO):Promise<User>{
        userObj.updatedAt = Date.now().toString();
        return  await this.userModel.findByIdAndUpdate(idUser, userObj);
    }

    async deleteOneUser(id){
        let findUser = await this.userModel.findById(id);
        console.log("deleting ...... ", findUser.book[0]);
        await this.bookModel.findByIdAndUpdate({"_id": findUser.book[0]}, { "$set": { "isIssued": false}}).exec();
        await this.userModel.findByIdAndUpdate({"_id": id}, { "$set": { "shouldReturn": false, 
        "issuedByFirstName": "", "issuedByLastName": ""}}).exec();
        return await this.userModel.findByIdAndDelete(id);
    }


    @Cron(CronExpression.EVERY_5_SECONDS)
    async getWhenShouldReturnBook(){
        const allUsers = await this.userModel.find({"shouldReturn": false }).exec();
        for(let i=0;i<allUsers.length;i++){
            console.log("inside for loop..")
            if(allUsers[i].daysLeft == 0){
                console.log("i saw number 0..");
                await this.userModel.findByIdAndUpdate({_id: allUsers[i]._id}, { "$set": { "shouldReturn": true}}).exec();
                await this.bookModel.findByIdAndUpdate({_id: allUsers[i].book[0]}, { "$set": { "shouldBeReturned": true}}).exec();
            }
            // }else if(moment(allUsers[i].dateRestitution).add(1, 'days').date() < moment(Date.now()).add(1, 'days').date()){
            //     console.log("Its under 0 !!!!")
            //     allUsers[i].daysLeft = 0;
            // }
            else{
                console.log("i will - a day here !");
                console.log("days left befor updating ", allUsers[i].daysLeft);
                allUsers[i].daysLeft =  moment(allUsers[i].dateRestitution).add(1, 'days').date() - moment(Date.now()).add(2, 'days').date();
                await this.userModel.findByIdAndUpdate({_id: allUsers[i]._id}, { "$set": { "daysLeft": allUsers[i].daysLeft}}).exec();
                console.log("days left after updating ", allUsers[i].daysLeft);
            }
        }
    }

    public async findOneUser(name: string): Promise<any>{
        return await this.userModel.findOne({firstName: name});
    }
}
