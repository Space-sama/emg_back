import { Cron, CronExpression } from '@nestjs/schedule/dist';
import { Pareto_Book, BookParetoDocument } from './../pareto_books/pareto_book.model';
import { User, UserDocument } from './../users/user.model';
import { Book, BookDocument } from './book.model';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, UpdateResult } from "typeorm";

@Injectable()
export class BookService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Pareto_Book.name) private paretoBookModel: Model<BookParetoDocument>){

    }
     
    async getAllBooks(){
      const books = await this.bookModel.find({}).populate('domain').exec();
      return books;
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async usedDocuments(){
      let myCounterNumbers: number=0;
      let myCounterBooks: number=0;
      let myTotalNumbersCounter: number=0;
      let cumulEmprunt: number=0;
      let pourcentage: number=0;
      let cumulPourcentage: number=0;
      let bookPourcentage: number=0;
      const usedDocs = await this.bookModel.find(
      {"counter": {$gt: 0}, "status": "Active"})
      .sort([['counter', 'descending']]).populate('domain').exec();
        // take total Cumul
      for(let i=1;i<usedDocs.length-1;i++){
        myCounterNumbers = myCounterNumbers+usedDocs[i].counter;
      }
      myTotalNumbersCounter = myCounterNumbers;
      console.log("Total Cumul is --> ", myTotalNumbersCounter);

      myCounterBooks = usedDocs.length;
      console.log("Total Books --> ", myCounterBooks);

      // Take Cumulation of each row
      for(let i=1;i<usedDocs.length-1;i++){
        cumulEmprunt = cumulEmprunt+usedDocs[i].counter;
        console.log("CUMUL EMPRUNT ---> ",cumulEmprunt);

        // Calculate pourcentage of each row
        pourcentage = (usedDocs[i].counter / myTotalNumbersCounter * 100);
        console.log("Book  ", usedDocs[i].nameBook, "His percentage is ", pourcentage.toFixed(2), " %");


        // Calculate cumul pourcentage of each row
        cumulPourcentage = cumulPourcentage+pourcentage;
        console.log("CUMUL Percentage IS -----> ######### ", cumulPourcentage.toFixed(2), " %");

        // book percentage
        bookPourcentage = (i / usedDocs.length * 100);
        console.log("helloooooooooooooooooooooooo", bookPourcentage, " i ", usedDocs.length);
        let paretoBookToSave = new this.paretoBookModel({
          nameBook: usedDocs[i].nameBook,
          identifiant: usedDocs[i].identifiant,
          location: usedDocs[i].location,
          counter: usedDocs[i].counter,
          cumulEmprunt: cumulEmprunt,
          pourcentage: pourcentage,
          cumulPourcentage: cumulPourcentage,
          bookPourcentage: bookPourcentage,
          domain: usedDocs[i].domain[0].label
        });
        let findBeforeAddBook:Pareto_Book = await this.paretoBookModel.findOne({
          "nameBook": usedDocs[i].nameBook,
        }).exec();

        if(!findBeforeAddBook){
          let paretoBookCreated = await paretoBookToSave.save();
          if(paretoBookCreated){
            console.log("Pareto book created");
          }else{
            console.log("Error creating pareto book !");
          }
        }else{
          console.log("Pareto Book ALREADY EXIST.....");
        }
        
      }
      return usedDocs;
    }

    async unusedDocs(){
      const unusedDocs = await this.bookModel.find({"counter": 0}).populate('domain').exec();
      return unusedDocs;
    }

    async getHistoryBookByNameInfo():Promise<any>{
      let dataInfo:any=[{}];
      let all = await this.bookModel.find({
        'nameBook': {
          $in : [
            'Les bases algorithmiques'
          ]
        }
      }).exec();
      console.log("count -------", all.length);
      let infoHistoryBooks = 
      await this.userModel.find({"isReturned": true, "shouldReturn": true, 
      "daysLeft": 0, "hist_Domain": "Génie Informatique (IF)"});

        for(let y=0;y<infoHistoryBooks.length;y++){
          let allBooksByName:any = 
          await this.bookModel.find({"nameBook": infoHistoryBooks[y].hist_Book}).exec();

          let count = allBooksByName.length;
          console.log("Count :", count);
          console.log("All :", all.length);
          let perInfo =  count / all.length * 100;
          dataInfo.push({
            nameBook: infoHistoryBooks[y].hist_Book, percentage: perInfo, location: infoHistoryBooks[y].hist_LOC
          });
        }
        return dataInfo;
      
    }
    

    async getAllBooksByDispo(){
        return await this.bookModel.find({isIssued: 'false'}).populate('domain').exec();
    }

    async getByFields(title: String, author: String,  edition?: Date, editor?: String, label?: String, keyWords?: String){
      let objFounded= await this.bookModel.find({
                $or: [
                  {
                    "nameBook": title
                  },
                  {
                    "author": author
                  },
                  {
                    "edition": edition
                  },
                  {
                    "editor": editor
                  },
                  {
                    "domain": label
                  },
                  {
                    "keyWords": {$regex: `${keyWords}`}
                  },
                  
                  
                ]
      }).populate('domain').exec();
      return objFounded;
    }

    async getOneBook(idBook):Promise<any> {
        return this.bookModel.findOne({_id: idBook}).populate('domain').exec();
    }

    async addOneBook(bookObj){
         let bookToSave = new this.bookModel({
            nameBook: bookObj.nameBook,
            identifiant: bookObj.identifiant,
            location: bookObj.location,
            ISBN: bookObj.ISBN,
            author: bookObj.author,
            pages: bookObj.pages,
            faculty: bookObj.faculty,
            edition: bookObj.edition,
            editor: bookObj.editor,
            counter: 0,
            bookType: bookObj.bookType,
            createdAt: Date.now(),
            status: 'Active',
            isIssued: false,
            domain: bookObj.domain,
            keyWords: bookObj.keyWords,
        });
        let findAlreadyExist = await this.bookModel.find(
          {$or: [
            { ISBN: bookToSave.nameBook },
            { identifiant: bookToSave.identifiant },
            // { location: bookToSave.location }
          ]});

          if(findAlreadyExist.length > 0){
            console.log("Cet identifiant à été déjà utilisé");
            return("Cet identifiant à été déjà utilisé");
          }else {
            let bookCreated = await bookToSave.save();
            return bookCreated;
          }
        
    }

    async totalBooksInfo(){
      const booksInfo = await this.bookModel.find({}).populate('domain').exec();
        let counter=0;
        for(let i=0; i<booksInfo.length;i++){
            if(booksInfo[i].domain[0].label == 'Génie Informatique (IF)'){
            counter=counter+1;
            }
        }
        let countAllInfoBooks = counter;
        console.log("counter books-------------------", countAllInfoBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Informatique (IF)"}).exec();
        let countBookIssuedInfo = users.length;
        console.log("counter users -------------------", countBookIssuedInfo);
        let calc = Math.floor(countBookIssuedInfo/countAllInfoBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
    }

    async totalBooksID(){
      const booksID = await this.bookModel.find({}).populate('domain').exec();
      let counter=0;
      for(let i=0; i<booksID.length;i++){
        if(booksID[i].domain[0].label == 'Génie Industriel (ID)'){
          counter=counter+1;
        }
      }
      let countAllIDBooks = counter;
        console.log("counter ID books-------------------", countAllIDBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Industriel (ID)"}).exec();
        let countBookIssuedID = users.length;
        console.log("counter users -------------------", countBookIssuedID);
        let calc = Math.floor(countBookIssuedID/countAllIDBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
    }

    async totalBooksFN(){
      const booksFN = await this.bookModel.find({}).populate('domain').exec();
      let counter=0;
      for(let i=0; i<booksFN.length;i++){
        if(booksFN[i].domain[0].label == 'Génie Financier (FN)'){
          counter=counter+1;
        }
      }
      let countAllFNBooks = counter;
        console.log("counter FN books-------------------", countAllFNBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Financier (FN)"}).exec();
        let countBookIssuedFN = users.length;
        console.log("counter users fn-------------------", countBookIssuedFN);
        let calc = Math.floor(countBookIssuedFN/countAllFNBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
    }

    async totalBooksGN(){
      const booksGN = await this.bookModel.find({}).populate('domain').exec();
      let counter=0;
      for(let i=0; i<booksGN.length;i++){
        if(booksGN[i].domain[0].label == 'Ouvrages Généreaux (GN)'){
          counter=counter+1;
        }
      }
      let countAllGNBooks = counter;
        console.log("counter GN books-------------------", countAllGNBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Ouvrages Généreaux (GN)"}).exec();
        let countBookIssuedGN = users.length;
        console.log("counter users GN-------------------", countBookIssuedGN);
        let calc = Math.floor(countBookIssuedGN/countAllGNBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
    }

    async totalBooksEL(){
      const booksEL = await this.bookModel.find({}).populate('domain').exec();
      let counter=0;
      for(let i=0; i<booksEL.length;i++){
        if(booksEL[i].domain[0].label == 'Génie Éléctrique (EL)'){
          counter=counter+1;
        }
      }
      let countAllELBooks = counter;
        console.log("counter EL books-------------------", countAllELBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Éléctrique (EL)"}).exec();
        let countBookIssuedEL = users.length;
        console.log("counter users EL-------------------", countBookIssuedEL);
        let calc = Math.floor(countBookIssuedEL/countAllELBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
    }

    async totalBooksCV(){
      const booksCV = await this.bookModel.find({}).populate('domain').exec();
      let counter=0;
      for(let i=0; i<booksCV.length;i++){
        if(booksCV[i].domain[0].label == 'Génie Civil (CV)'){
          counter=counter+1;
        }
      }
      let countAllCVBooks = counter;
        console.log("counter CV books-------------------", countAllCVBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Génie Éléctrique (CV)"}).exec();
        let countBookIssuedCV = users.length;
        console.log("counter users CV-------------------", countBookIssuedCV);
        let calc = Math.floor(countBookIssuedCV/countAllCVBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
      
    }

    async totalBooksSM(){
      const booksSM = await this.bookModel.find({}).populate('domain').exec();
      let counter=0;
      for(let i=0; i<booksSM.length;i++){
        if(booksSM[i].domain[0].label == 'Stratégie - Management (SM)'){
          counter=counter+1;
        }
      }
      let countAllSMBooks = counter;
        console.log("counter SM books-------------------", countAllSMBooks);
        const users = await this.userModel.find(
            {"isReturned": true,
            "shouldReturn": true,
            "daysLeft": 0,
            "hist_Domain": "Stratégie - Management (SM)"}).exec();
        let countBookIssuedSM = users.length;
        console.log("counter users SM-------------------", countBookIssuedSM);
        let calc = Math.floor(countBookIssuedSM/countAllSMBooks*100);
        if(calc>100){
          calc = 100;
        }
        if(isNaN(calc)){
          calc=0;
        }
        if(calc <0){
          calc=0;
        }
        console.log("calcul------------", calc)
        return calc;
    }

    async updateOneBook(idBook, bookObj):Promise<UpdateResult>{
        bookObj.updatedAt = Date.now().toString();
        return await this.bookModel.findByIdAndUpdate(idBook, bookObj);
    }

    async deleteOneBook(idBook):Promise<DeleteResult>{
        return await this.bookModel.findByIdAndDelete(idBook);
    }

    // Get one book by identifiant
    public async findOneBookByCode(codeBook: string): Promise<any>{
        return await this.bookModel.findOne({code: codeBook});
    }
}
