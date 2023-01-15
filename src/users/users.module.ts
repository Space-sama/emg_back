import { Book, BookSchema } from './../books/book.model';
import { UsersService } from './user.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { SendGridModule, SendGridService } from '@anchan828/nest-sendgrid';


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

  exports: [UsersService ],

})
export class UsersModule {

  
}
