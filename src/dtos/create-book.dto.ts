import { Book } from './../books/book.model';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsIn, IsMongoId, IsBoolean } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class CreateBookDTO {


    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly nameBook: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly identifiant: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly location: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly ISBN: string

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
    @IsDate()
    public edition: Date

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly editor: string

    @IsNotEmpty()
    @IsString()
    public bookType: string

    @IsNotEmpty()
    @IsString()
    @IsIn(['Active', 'Inactive'])
    public status: string

    @IsNotEmpty()
    @IsDate()
    public createdAt: string

    @IsNotEmpty()
    @IsBoolean()
    isIssued: boolean;

    @IsNotEmpty()
    @IsBoolean()
    shouldBeReturned: boolean;

    @IsNotEmpty()
    @IsString()
    public daysLeft: string

    @IsNotEmpty()
    @IsString()
    public issuedByFirstName: string

    @IsNotEmpty()
    @IsString()
    public issuedByLastName: string

    @IsNotEmpty()
    @IsDate()
    public updatedAt: string

    @IsNotEmpty()
    @IsMongoId()
    public domain: any

    @IsNotEmpty()
    @IsNumber()
    @Prop({required: false})
    readonly counter: number
    
    @IsNotEmpty()
    @IsString()
    public keyWords: string
}
