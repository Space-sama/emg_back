import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, UpdateResult } from "typeorm";
import { Book_Req, Book_Req_Document } from './book_req.model';

@Injectable()
export class Book_Req_Service {

    constructor(@InjectModel(Book_Req.name) private book_req_Model: Model<Book_Req_Document>){

    }
     
    async getAllBooksReq(){
       return await this.book_req_Model.find({status: "Active", availibility: "in_progress"}).populate('domain').exec();
    }

    async updateAvailibility(id){
        return await this.book_req_Model.findByIdAndUpdate({"_id": id}, { "$set": { "availibility": "purchased"}}).exec();
    }

    async updateAvailibility_2(id){
        return await this.book_req_Model.findByIdAndUpdate({"_id": id}, { "$set": { "availibility": "in_progress"}}).exec();
    }

    async getAllPurchased(){
        return await this.book_req_Model.find({status: "Active", availibility: "purchased"}).populate('domain').exec();
    }

    async getOneBookReq(idBook):Promise<any> {
        return this.book_req_Model.findOne({_id: idBook}).populate('domain').exec();
    }

    async addOneBookReq(bookObj){
        let bookToSave = new this.book_req_Model({
            nameBook: bookObj.nameBook,
            author: bookObj.author,
            pages: bookObj.pages,
            faculty: bookObj.faculty,
            bookType: bookObj.bookType,
            createdAt: Date.now(),
            status: 'Active',
            availibility: 'in_progress',
            applicant: bookObj.applicant,
            phone: bookObj.phone,
            email: bookObj.email,
            domain: bookObj.domain,
        });
        let bookCreated = await bookToSave.save();
        return bookCreated;
    }

    async updateOneBookReq(idBook, bookObj):Promise<UpdateResult>{
        bookObj.updatedAt = Date.now().toString();
        return await this.book_req_Model.findByIdAndUpdate(idBook, bookObj);
    }

    async deleteOneBookReq(idBook):Promise<DeleteResult>{
        return await this.book_req_Model.findByIdAndDelete(idBook);
    }
    
}
