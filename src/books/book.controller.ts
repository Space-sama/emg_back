import { BookValidationPipes } from './../PipeValidation/book-info-validation.pipe';
import { UpdateBookDTO } from './../dtos/update-book.dto';
import { CreateBookDTO } from './../dtos/create-book.dto';
import { BookService } from './book.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';


@Controller('books')
export class BooksController {

    constructor(private readonly bookService:BookService){

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
        return this.bookService.getByFields(bookObj.nameBook, bookObj.author, bookObj.edition, bookObj.editor, bookObj.domain);
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
