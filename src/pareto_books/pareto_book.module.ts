import { ParetoBooksController } from './pareto_book.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pareto_Book, ParetoBookSchema } from './pareto_book.model';
import { ParetoBookService } from './pareto_book.service';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Pareto_Book.name, schema: ParetoBookSchema },
      ]),
  
],
    
  controllers: [ParetoBooksController],
  providers: [ParetoBookService],
  exports: [ParetoBookService],
})
export class ParetoBookModule {
  
}
