import { Book, BookDocument } from './book.model';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, UpdateResult } from "typeorm";

@Injectable()
export class BookService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>){

    }
     
    async getAllBooks(){
       return await this.bookModel.find().populate('domain').exec();
    }

    async getAllBooksByDispo(){
        return await this.bookModel.find({isIssued: 'false'}).populate('domain').exec();
     }

     async getByFields(title: String, author: String,  edition?: Date, editor?: String, label?: String){
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
                    
                    
                  ]
        }).populate('domain').exec();
        return objFounded;
     }
    //  {
    //   "domain":[
    //     {
    //       "_id": label
    //     }
    //   ] 
    // }

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
            bookType: bookObj.bookType,
            createdAt: Date.now(),
            status: 'Active',
            isIssued: false,
            domain: bookObj.domain
        });
        let bookCreated = await bookToSave.save();
        return bookCreated;
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
