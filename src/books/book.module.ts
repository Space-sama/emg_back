import { Book, BookSchema } from './book.model';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BooksController } from './book.controller';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Book.name, schema: BookSchema }
      ]),
  
],
    
  controllers: [BooksController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {
  
}
