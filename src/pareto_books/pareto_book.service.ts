import { Pareto_Book, BookParetoDocument } from './pareto_book.model';
import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ParetoBookService {

    constructor(@InjectModel(Pareto_Book.name) private paretoBookModel: Model<BookParetoDocument>){

    }
     
    async getAllParetoBooks(){
      const books = await this.paretoBookModel.find({}).sort([['counter', 'descending']]).exec();
      return books;
    }
}
