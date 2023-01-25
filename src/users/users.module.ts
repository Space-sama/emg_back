import { WarningService } from './../user_warnings/warning.service';
import { Module } from '@nestjs/common';
import { Warning, WarningSchema } from './../user_warnings/warning.model';
import { Book, BookSchema } from './../books/book.model';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UsersController } from './users.controller';


@Module({
  imports: [

    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Book.name, schema: BookSchema },
        { name: Warning.name, schema: WarningSchema }

      ]),

      // MailgunModule.forRoot({
      //   username: 'api',
      //   key: '83d369549c3618adf31fd55bf6fcf19d-4c2b2223-fac09e53',
      //   public_key: 'pubkey-198a160f4c00e0b547993600554e7fd4', // OPTIONAL
      //   timeout: 30000, // OPTIONAL, in milliseconds
      //   url: 'api.mailgun.net', // OPTIONAL, default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
      // }),
  
  ],
  controllers: [UsersController],
  providers: [UsersService, WarningService],
  exports: [UsersService, WarningService],

})
export class UsersModule {

  
}
