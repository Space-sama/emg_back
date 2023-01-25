import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class UserValidationPipes implements PipeTransform<any> {
    constructor();
    transform(value: any, metadata: ArgumentMetadata): any;
}
