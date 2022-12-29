import { Book } from './../books/book.model';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsIn, IsMongoId } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class CreateReqBookDTO {

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly nameBook: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly author: string

    @IsNotEmpty()
    @IsNumber()
    @Prop({required: true})
    readonly pages: number

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly faculty: string

    @IsNotEmpty()
    @IsString()
    public bookType: string
    

    @IsNotEmpty()
    @IsString()
    @IsIn(['purchased', 'in_progress'])
    public availibility: string

    @IsNotEmpty()
    @IsString()
    applicant: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    email: string


    @IsNotEmpty()
    @IsString()
    @IsIn(['Active', 'Inactive'])
    public status: string

    @IsNotEmpty()
    @IsDate()
    public createdAt: string

    @IsNotEmpty()
    @IsDate()
    public updatedAt: string

    @IsNotEmpty()
    @IsMongoId()
    public domain: any
    
}
