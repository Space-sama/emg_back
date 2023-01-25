import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class BookValidationPipes implements PipeTransform<any> {
    constructor();
    transform(value: any, metadata: ArgumentMetadata): any;
}
