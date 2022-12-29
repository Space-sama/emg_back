import { CategoryModule } from './categories/category.module';
import { BookModule } from './books/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Book_Req_Module } from './book_requests/book_req.module';

require("dotenv").config();

@Module({

  imports: [
    UsersModule,
    BookModule,
    CategoryModule,
    Book_Req_Module,
    // MongooseModule.forRoot(
    // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ljs3d.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    // ),
    MongooseModule.forRoot("mongodb://localhost:27017/biblio"),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
