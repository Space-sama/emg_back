import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Books_Req_Controller } from './book_req.controller';
import { Book_Req, Book_Req_Schema } from './book_req.model';
import { Book_Req_Service } from './book_req.service';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Book_Req.name, schema: Book_Req_Schema }
      ]),
  
],
    
  controllers: [Books_Req_Controller],
  providers: [Book_Req_Service],
  exports: [Book_Req_Service],
})
export class Book_Req_Module {
  
}
