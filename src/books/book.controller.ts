import { Book } from './book.model';
import { BookValidationPipes } from './../PipeValidation/book-info-validation.pipe';
import { UpdateBookDTO } from './../dtos/update-book.dto';
import { CreateBookDTO } from './../dtos/create-book.dto';
import { BookService } from './book.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';


@Controller('books')
export class BooksController {

    constructor(private readonly bookService:BookService){

    }

    @Get('historyByName')
    async getHistoryBooksByName(){
        return await this.bookService.getHistoryBookByNameInfo();
    }

    @Get('/totalBooksInfo')
    async totalBooksInfo(){
        return await this.bookService.totalBooksInfo();
    }

    @Get('/used')
    async usedDocs(){
        return await this.bookService.usedDocuments();
    }

    @Get('/unused')
    async anusedDocs(){
        return await this.bookService.unusedDocs();
    }

    @Get('/totalBooksID')
    async totalBooksID(){
        return await this.bookService.totalBooksID();
    }

    @Get('/totalBooksFN')
    async totalBooksFN(){
        return await this.bookService.totalBooksFN();
    }

    @Get('/totalBooksGN')
    async totalBooksGN(){
        return await this.bookService.totalBooksGN();
    }

    @Get('/totalBooksEL')
    async totalBooksEL(){
        return await this.bookService.totalBooksEL();
    }

    @Get('/totalBooksCV')
    async totalBooksCV(){
        return await this.bookService.totalBooksCV();
    }

    @Get('/totalBooksSM')
    async totalBooksSM(){
        return await this.bookService.totalBooksSM();
    }

    @Get()
    getAllBooks(){
        return this.bookService.getAllBooks();
    }

    @Get('/availability')
    getAllBooksByDispo(){
        return this.bookService.getAllBooksByDispo();
    }

    @Get(':id')
    getOneBook(@Param('id') idBook){
        return this.bookService.getOneBook(idBook);
    }
    

    @Post('/getByFields')
    getByFields(@Body() bookObj:UpdateBookDTO){
        return this.bookService
        .getByFields(bookObj.nameBook, bookObj.author, bookObj.edition, bookObj.editor, bookObj.domain);
    }

    // @Get('/getByFields/:nameBook/:author/:label')
    // getByFields(@Param('nameBook') nameBook?: String, @Param('author') author?:String, @Param('label') label?:String){
    //     return this.bookService.getByFields(nameBook, author, label);
    // }

    @Post()
    // @UsePipes(BookValidationPipes)
    addOneBook(@Body() bookObj:CreateBookDTO):Promise<any>{
        return this.bookService.addOneBook(bookObj);
    }

    @Put(':id')
    async updateOneBook(@Param('id') id, @Body() bookObj:UpdateBookDTO) {
        return this.bookService.updateOneBook(id, bookObj);
    }

    @Delete(':id')
    async deleteOneBook(@Param('id') id:String){
        return await this.bookService.deleteOneBook(id);
    }
}
