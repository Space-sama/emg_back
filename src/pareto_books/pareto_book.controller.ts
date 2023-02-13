import { BookValidationPipes } from './../PipeValidation/book-info-validation.pipe';
import { UpdateBookDTO } from './../dtos/update-book.dto';
import { CreateBookDTO } from './../dtos/create-book.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ParetoBookService } from './pareto_book.service';


@Controller('pareto_books')
export class ParetoBooksController {

    constructor(private readonly paretoBookService:ParetoBookService){

    }

    @Get()
    async getAllParetoBooks(){
        return await this.paretoBookService.getAllParetoBooks();
    }


}
