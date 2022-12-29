import { BookValidationPipes } from './../PipeValidation/book-info-validation.pipe';
import { UpdateBookDTO } from './../dtos/update-book.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { Book_Req_Service } from './book_req.service';
import { CreateReqBookDTO } from 'src/dtos/create_book_req';
import { UpdateReqBookDTO } from 'src/dtos/update_book_req';


@Controller('books_req')
export class Books_Req_Controller {

    constructor(private readonly book_req_service:Book_Req_Service){

    }
    
    @Get()
    getAllBooks_Req(){
        return this.book_req_service.getAllBooksReq();
    }

    @Get("purchased")
    getAllBooks_Req_Purchased(){
        return this.book_req_service.getAllPurchased();
    }

    @Get(':id')
    getOneBook_Req(@Param('id') idBook){
        return this.book_req_service.getOneBookReq(idBook);
    }

    @Post()
    addOneBook(@Body() bookObj:CreateReqBookDTO):Promise<any>{
        return this.book_req_service.addOneBookReq(bookObj);
    }

    @Put(':id')
    async updateOneBook(@Param('id') id, @Body() bookObj:UpdateReqBookDTO){
        return this.book_req_service.updateOneBookReq(id, bookObj);
    }

    @Put('changeAv/:id')
    async updateAvailibility(@Param('id') id){
        return this.book_req_service.updateAvailibility(id);
    }


    @Put('changeAv_2/:id')
    async updateAvailibility_2(@Param('id') id){
        return this.book_req_service.updateAvailibility_2(id);
    }
    @Delete(':id')
    async deleteOneBook(@Param('id') id:String){
        return await this.book_req_service.deleteOneBookReq(id);
    }
}
