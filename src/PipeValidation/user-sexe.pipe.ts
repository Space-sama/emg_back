import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserValidationPipesSexe implements PipeTransform<any> {
  constructor(){
  }
  transform(value: any, metadata: ArgumentMetadata) {

    if(value.sexe == 'Homme' || value.sexe == 'Femme'){
        return value;
    }
    else {
      throw new BadRequestException('Sexe doit être Homme / Femme !');
      
    }
  }
}
