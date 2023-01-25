import { Module } from '@nestjs/common';
import { WarningService } from './warning.service';
import { WarningController } from './warning.controller';
import { Warning, WarningSchema } from './warning.model';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [

    MongooseModule.forFeature(
      [
        { name: Warning.name, schema: WarningSchema },
      ]),
  
  ],
  
  controllers: [WarningController],
  providers: [WarningService],
  exports: [WarningService],

})
export class WarningModule {

  
}
