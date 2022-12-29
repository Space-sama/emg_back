import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CategoryValidationPipes implements PipeTransform<any> {
  constructor(){
  }
  transform(value: any, metadata: ArgumentMetadata) {

    if(value.status == 'Active' || value.status == 'Inactive'){
        return value;
    }
    else {
      throw new BadRequestException('Le status doit être Active ou Inactive !');
      
    }
  }
}
