import { ParetoBookModule } from './pareto_books/pareto_book.module';
import { WarningModule } from './user_warnings/warning.module';
import { CategoryModule } from './categories/category.module';
import { BookModule } from './books/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Book_Req_Module } from './book_requests/book_req.module';
import { AdminModule } from './admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendGridModule } from "@anchan828/nest-sendgrid";
import { ConfigModule } from '@nestjs/config';
import { MailgunModule } from 'nestjs-mailgun';

require("dotenv").config();

@Module({

  imports: [
    SendGridModule.forRoot({
      apikey: "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",
      // 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
    }),
    // MailerModule.forRoot(
    //   {
    //     transport:{
    //       host: 'smtp.sendgrid.net',
    //       service: 'gmail',
    //       auth: {
    //         user: 'oussama.elharmali@gmail.com',
    //         pass: 'Oussama@@2050',
    //       },
    //     }
    //   }
    // ),
    // MailgunModule.forRoot({
    //   username: 'api',
    //   key: '83d369549c3618adf31fd55bf6fcf19d-4c2b2223-fac09e53',
    //   public_key: 'pubkey-198a160f4c00e0b547993600554e7fd4', // OPTIONAL
    //   timeout: 3000, // OPTIONAL, in milliseconds
    //   url: 'api.mailgun.net', // OPTIONAL, default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
    // }),
    UsersModule,
    BookModule,
    CategoryModule,
    Book_Req_Module,
    AdminModule,
    WarningModule,
    ParetoBookModule,
    
    
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
