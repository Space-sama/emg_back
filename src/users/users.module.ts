import { Book, BookSchema } from './../books/book.model';
import { UsersService } from './user.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UsersController } from './users.controller';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Book.name, schema: BookSchema }
      ]),
  
  ],
  controllers: [UsersController],

  providers: [UsersService],

  exports: [UsersService],

})
export class UsersModule {

  
}
