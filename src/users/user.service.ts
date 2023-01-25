import { Warning, WarningDocument } from './../user_warnings/warning.model';
import { WarningService } from './../user_warnings/warning.service';
import { Book, BookDocument } from './../books/book.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { UpdateUserDTO } from 'src/dtos/update-users.dto';
import { CreateUserDTO } from 'src/dtos/create-users.dto';
import * as moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule/dist';
import { MailerService } from '@nestjs-modules/mailer';
import { SendGridService } from "@anchan828/nest-sendgrid";
import { find } from 'rxjs';
// import * as SendGrid from '@sendgrid/mail';
// import { ConfigService } from '@nestjs/config/dist';
// import { MailgunService } from 'nestjs-mailgun/dist/mailgun.service';
// import { MailgunMessageData, MailgunService } from 'nestjs-mailgun'
@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Warning.name) private warningModel: Model<WarningDocument>,
    private readonly warningService: WarningService,
    private readonly sandGrid: SendGridService){

    }

// private mailService: MailerService
    async send() {
        
          let s = await this.sandGrid.send({
            to: 'hawkander.666@gmail.com', // Change to your recipient
            from: 'oussama.elharmali@emg.ac.ma', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',  
          });
          if(!s){
            return "error";
          }
          return "success";
        //     const options: MailgunMessageData = {
        //     from: 'oussama.elharmali@gmail.com',
        //     to: 'hawkander.666@gmail.com',
        //     subject: 'Hello subject',
        //     text: 'text here ',
        //     html: '<strong>HTML</strong>',
        //   };
        //   return await this.mailgunService.createEmail("oussama.elharmali@gmail.com", options);
          
      }
    //private sendServer: SendGridService
    // @Cron(CronExpression.EVERY_5_SECONDS)
    // async sayHello():Promise<any> {
    //     let sending = this.mailService.sendMail({
    //         to: 'hawkander.666@gmail.com',
    //         from: 'pseudoxr@gmail.com',
    //         subject: 'This a test !!!!....',
    //         text: 'SALAM ......',
    //         inReplyTo: "pseudoxr@gmail.com"
    //     });
    //     if(sending){
    //         return("Succeeeeess...");
    //     }else {
    //         return("fail...");
    //     }
    // }

    
    
     
    async getAllUsers(){
       const allUsers = await this.userModel.find({"isReturned": false, "dateReturned": null}).populate('book').exec();
       return allUsers;
    }

    async users(){
        const users = await this.userModel.find({}).exec();
        return users;
    }

    async booksAlreadyIssued(){
        const users = await this.userModel.find({"isReturned": true, "shouldReturn": true, "daysLeft": 0}).exec();
        return users.length;
    }

    async booksAlreadyIssuedCivilEng(){
        const users = await this.userModel.find(
            {
            "isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Civil (CV)"}).exec();
        return users.length;
    }

    async booksAlreadyIssuedIDEng(){
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Industriel (ID)"}).exec();
        return users.length;
    }

    async booksAlreadyIssuedEL(){
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Éléctrique (EL)"}).exec();
        return users.length;
    }

    async booksAlreadyIssuedInfoEng(){
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Informatique (IF)"}).exec();
            return users.length;
    }

    async booksAlreadyIssuedSM(){
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Stratégie - Management (SM)"}).exec();
        return users.length;
    }

    async booksAlreadyIssuedFN(){
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Financier (FN)"}).exec();
        return users.length;
    }

    async booksAlreadyIssuedGN(){
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Ouvrages Généreaux (GN)"}).exec();
        return users.length;
    }

    async getStudents(){
        return await this.userModel.find({"profession": "Etudiant"}).exec();
    }

    async getProfesseurs(){
        return await this.userModel.find({"profession": "Professeur"}).exec();
    }

    async getAdministrative(){
        return await this.userModel.find({"profession": "Administratif"}).exec();
    }

    async getOneUser(idUser:string){
        return await this.userModel.findOne({_id: idUser}).populate('book').exec();
    }

    async bookReturned(idUser:string){
        try {

            let getOne = await this.userModel.findOne({"_id": idUser}).populate("book").exec();
            await this.bookModel.findByIdAndUpdate(
            {"_id": getOne.book[0]["_id"]},
            {"$set": 
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
            "daysLeft": 0,
            "dateReturned": moment().startOf('day').add(1, 'hours'),
            "hist_Book": getOne.book[0]["nameBook"],
            "hist_ISBN": getOne.book[0]["ISBN"],
            "hist_ID": getOne.book[0]["identifiant"],
            "hist_LOC": getOne.book[0]["location"],
            "hist_Domain": findBook.domain[0]["label"],
        }}).exec();

        let findUpdatedUser = await this.userModel.findOne({"_id": idUser}).exec();
            console.log("date returned ", findUpdatedUser.dateReturned, "date restitution ", findUpdatedUser.dateRestitution);
            
        if(findUpdatedUser.dateReturned > findUpdatedUser.dateRestitution){
            console.log("Avertissement.....");
            let editWarningUser = await this.warningService.findByCin(findUpdatedUser.CIN);
            console.log("get one warning founded ", editWarningUser);

            if(editWarningUser && editWarningUser.tentative == 0){
                console.log("Tetative === ", editWarningUser.tentative);
                    await this.warningModel.updateOne({"_id": editWarningUser._id}, 
                    { 
                        "$set":{ 
                            "tentative": 1,
                            "w_one": moment().startOf('day'),
                            "w_two": null,
                            "w_three": null,
                            "updatedAt": moment().startOf('day'),
                        }}).exec();
                        await this.userModel.findByIdAndUpdate({"_id": idUser}, 
                        { "$set": {
                            tentative: 1,
                        }}).exec();
            }
            else if(editWarningUser && editWarningUser.tentative == 1){
                console.log("Tetative === ", editWarningUser.tentative);
                    await this.warningModel.updateOne({"_id": editWarningUser._id}, 
                    { 
                        "$set":{ 
                            "tentative": 2,
                            "w_two":  moment().startOf('day'),
                            "w_three": null,
                            "updatedAt": moment().startOf('day'),
                        }}).exec();
                        await this.userModel.findByIdAndUpdate({"_id": idUser}, 
                        { "$set": {
                            tentative: 2,
                        }}).exec();
            }
            else if(editWarningUser && editWarningUser.tentative == 2){
                console.log("Tetative === ", editWarningUser.tentative);
                    await this.warningModel.updateOne({"_id": editWarningUser._id}, 
                    { 
                        "$set":{ 
                            "tentative": 3,
                            "w_three": moment().startOf('day'),
                            "updatedAt": moment().startOf('day'),
                            "activateIn": moment().startOf('day').add(1, 'years'),
                        }}).exec();
                        await this.userModel.findByIdAndUpdate({"_id": idUser}, 
                        { "$set": {
                            tentative: 3,
                            activateIn: moment().startOf('day').add(1, 'years')
                        }}).exec();
            }
            else{
                console.log("tentative blocked...");
            }
        }
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

    async addUserByCIN(userObj: CreateUserDTO):Promise<any>{
        let now = moment().startOf('day');
        let findByCin:any = await this.userModel.find({
            "CIN": userObj.CIN,
            "daysLeft": 0, 
            "shouldReturn": true, 
            "isReturned": true,
        }).exec();
        if(findByCin.length==0){
            return ("Cet utilisateur n'existe pas !");
        }
        let userToSave:any = new this.userModel({
            firstName: findByCin[0].firstName,
            lastName: findByCin[0].lastName,
            CIN: userObj.CIN,
            sexe: findByCin[0].sexe,
            profession: findByCin[0].profession,
            phone: findByCin[0].phone,
            email: findByCin[0].email,
            createdAt: Date.now(),
            updatedAt: "",
            status: "Active",
            dateIssuedBook: Date.now()+1,
            dateRestitution: moment(userObj.dateRestitution).add(1, 'hours'),
            isReturned: false,
            dateReturned: null,
            tentative: 0,
            activateIn: null,
            book: userObj.book,
            // Cron variant time
            daysLeft: moment.duration(moment(userObj.dateRestitution).diff(now)).asDays(),
            // fixed time
            forTimeOf: moment.duration(moment(userObj.dateRestitution).add('days').diff(now)).asDays(),
        });
        let findWarningUser:Object | any = await this.warningService.findByCin(userToSave.CIN);
     
        if(findWarningUser){
            console.log("warning ", findWarningUser);
            if(findWarningUser.tentative == 3){
                console.log("tentative equal// ", findWarningUser.tentative);
                return("Cet utilisateur a dépassé le nombre d'avertissements !");
            }else{
                console.log("tentative not 3 //");
            }
        }
        let findAlreadyProgressIssued_twoBooks = await this.userModel.find(
            {
                "CIN": userToSave.CIN, 
                "isReturned": false, "dateReturned": null,
            }
        ).exec();
        if(findAlreadyProgressIssued_twoBooks.length == 2){
            console.log("This user is already in progress with an issued book !!!");
            return("Cet utilisateur à déjà emprunté deux documents !");
        }
        else{
            let userCreated = await userToSave.save();
            await this.bookModel.findByIdAndUpdate({"_id": userCreated.book[0]}, { "$set": { "isIssued": true, 
            "issuedByFirstName": findByCin[0].firstName, "issuedByLastName": findByCin[0].lastName, 
            "counter":1}}).exec();
            if(!findWarningUser) {
                let newWarning = new this.warningModel({
                    f_name: userCreated.firstName,
                    l_name: userCreated.lastName,
                    cin: userCreated.CIN,
                    tentative: 0,
                    w_one: "",
                    w_two: "",
                    w_three: "",
                    createdAt: Date.now(),
                    updatedAt: null,
                });
                await this.warningService.addWarning(newWarning);
            }
            return userCreated;
        }
    }

    async addOneUser(userObj:CreateUserDTO):Promise<any> {
        let now = moment().startOf('day');
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
            status: "Active",
            dateIssuedBook: Date.now()+1,
            dateRestitution: moment(userObj.dateRestitution).add(1, 'hours'),
            isReturned: false,
            dateReturned: null,
            tentative: 0,
            activateIn: null,
            book: userObj.book,
            // Cron variant time
            daysLeft: moment.duration(moment(userObj.dateRestitution).diff(now)).asDays(),
            // fixed time
            forTimeOf: moment.duration(moment(userObj.dateRestitution).add('days').diff(now)).asDays(),
        });
        let findWarningUser:Object | any = await this.warningService.findByCin(userToSave.CIN);
     
        if(findWarningUser){
            console.log("warning ", findWarningUser);
            if(findWarningUser.tentative == 3){
                console.log("tentative equal ", findWarningUser.tentative);
                return("Cet utilisateur a dépassé le nombre d'avertissements !");
            }else{
                console.log("tentative not 3");
            }
        }
        let findAlreadyProgressIssued_twoBooks = await this.userModel.find(
            {
                "CIN": userToSave.CIN, 
                "isReturned": false, "dateReturned": null,
            }
        ).exec();
        if(findAlreadyProgressIssued_twoBooks.length == 2){
            console.log("This user is already in progress with an issued book !!!");
            return("Cet utilisateur à déjà emprunté deux documents !");
        }
        else{
            let userCreated = await userToSave.save();
            await this.bookModel.findByIdAndUpdate({"_id": userCreated.book[0]}, { "$set": { "isIssued": true, 
            "issuedByFirstName": userObj.firstName, "issuedByLastName": userObj.lastName, "counter": 1}}).exec();
            if(!findWarningUser) {
                let newWarning = new this.warningModel({
                    f_name: userCreated.firstName,
                    l_name: userCreated.lastName,
                    cin: userCreated.CIN,
                    tentative: 0,
                    w_one: "",
                    w_two: "",
                    w_three: "",
                    createdAt: Date.now(),
                    updatedAt: null,
                });
                await this.warningService.addWarning(newWarning);
            }
            return userCreated;
        }
       
        
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

    @Cron(CronExpression.EVERY_10_SECONDS)
    async getWhenShouldReturnBook(){
        const allUsers = await this.userModel.find({"shouldReturn": false }).exec();
        for(let i=0;i<allUsers.length;i++){
            console.log("inside for loop..");
            let now = moment().startOf('day');
            if(allUsers[i].daysLeft == 0 || moment(allUsers[i].dateRestitution).add('days') < now){
                console.log("i saw number 0..");
                await this.userModel.findByIdAndUpdate({_id: allUsers[i]._id}, { "$set": { "shouldReturn": true}}).exec();
                await this.bookModel.findByIdAndUpdate({_id: allUsers[i].book[0]}, { "$set": { "shouldBeReturned": true}}).exec();
                // await this.mailService.sendMail({
                //     to: 'hawkander.666@gmail.com',
                //     from:'hawkander.666@gmail.com',
                //     subject: 'Test subject here....',
                //     text: 'Hello ......',
                // });
                console.log("Succeeeeess...");
            }
            else{
                console.log("i will - a day here !");
                console.log("days left befor updating ", allUsers[i].daysLeft);
                let now = moment().startOf('day');
                let restitution = moment(allUsers[i].dateRestitution).add(-1, "hours");
                let left = moment.duration(restitution.diff(now)).asDays(); 
                console.log("now", now);
                console.log("restitu", restitution);
                console.log("left -------------", left);
                allUsers[i].daysLeft = left;
                // allUsers[i].daysLeft =  moment(allUsers[i].dateRestitution).add(1, 'days').date() - moment(Date.now()).add(2, 'days').date();
                await this.userModel.findByIdAndUpdate({_id: allUsers[i]._id}, { "$set": { "daysLeft": allUsers[i].daysLeft}}).exec();
                console.log("days left after updating ", allUsers[i].daysLeft);
            }
        }
    }

    public async findOneUser(name: string): Promise<any>{
        return await this.userModel.findOne({firstName: name});
    }
}
