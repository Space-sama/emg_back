import { Book } from './../books/book.model';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsMongoId, IsBoolean } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class UpdateBookDTO {


    @IsNotEmpty()
    @IsOptional()
    @Prop({required: true})
    readonly nameBook: string


    @IsNotEmpty()
    @IsOptional()
    @Prop({required: true})
    readonly identifiant: string

    @IsNotEmpty()
    @IsOptional()
    @Prop({required: true})
    readonly location: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Prop({required: true})
    readonly ISBN: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly author: string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    readonly pages: number

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly faculty: string

    @IsNotEmpty()
    @IsDate()
    @IsOptional()
    public edition: Date

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly editor: string

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    isIssued: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    shouldBeReturned: boolean;

    @IsNotEmpty()
    @IsString()
    public bookType: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    public issuedByFirstName: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    public issuedByLastName: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    public status: string

    @IsOptional()
    @IsMongoId()
    public domain: any
    
}
