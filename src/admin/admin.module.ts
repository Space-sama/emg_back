import { JwtStrategy } from './../jwt.strategy';
import { LocalStrategy } from './../local.auth';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { Admin, AdminSchema } from './admin.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '600000s' },
    }),
    MongooseModule.forFeature(
      [
        { name: Admin.name, schema: AdminSchema },
      ])
  ],
  controllers: [AdminController],

  providers: [AdminService],

  exports: [AdminService],

})
export class AdminModule {

  
}
