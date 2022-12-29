import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserValidationPipesProfession implements PipeTransform<any> {
  constructor(){
  }
  transform(value: any, metadata: ArgumentMetadata) {

    if(value.profession == 'Professeur' || value.status == 'Etudiant'){
        return value;
    }
    else {
      throw new BadRequestException('Profession est pour un professeur / étudiant !');
      
    }
  }
}
