import { Book, BookSchema } from './book.model';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BooksController } from './book.controller';
import { User, UserSchema } from 'src/users/user.model';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Book.name, schema: BookSchema },
        { name: User.name, schema: UserSchema },
      ]),
  
],
    
  controllers: [BooksController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {
  
}
