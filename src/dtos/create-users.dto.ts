import { Book } from './../books/book.model';
import { IsIn, IsMongoId, IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly firstName: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly lastName: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true, unique: true})
    readonly CIN: string

    @IsNotEmpty()
    @IsString()
    // @IsIn(['Homme', 'Femme'])
    // @Prop({required: true})
    readonly sexe: string

    @IsNotEmpty()
    @IsString()
    // @IsIn(['Professeur', 'Etudiant'])
    // @Prop({required: true})
    readonly profession: string

    @IsNotEmpty()
    @IsString()
    public phone: string

    @IsNotEmpty()
    @IsString()
    @Prop({required: true, unique: true})
    readonly email: string

    @IsNotEmpty()
    @IsDate()
    public createdAt: string

    @IsNotEmpty()
    @IsDate()
    public updatedAt: string

    @IsNotEmpty()
    @IsString()
    @IsIn(['Active', 'Inactive'])
    public status: string

    @IsNotEmpty()
    @IsDate()
    public dateIssuedBook: Date

    @IsNotEmpty()
    @IsDate()
    public dateRestitution: Date

    @IsNotEmpty()
    @IsString()
    public daysLeft: string

    @IsNotEmpty()
    @IsString()
    public forTimeOf: string

    // @IsNotEmpty()
    // @IsDate()
    // public numberOfDays: any

    @IsNotEmpty()
    @IsBoolean()
    shouldReturn: boolean

    @IsNotEmpty()
    @IsDate()
    dateReturned: Date

    @IsNotEmpty()
    @IsBoolean()
    isReturned: boolean
    

    @IsNotEmpty()
    @IsMongoId()
    public book: any

    @IsNotEmpty()
    @IsString()
    hist_Book: string

    @IsNotEmpty()
    @IsString()
    hist_ISBN: string

    @IsNotEmpty()
    @IsString()
    hist_ID: string

    @IsNotEmpty()
    @IsString()
    hist_LOC: string

    @IsNotEmpty()
    @IsString()
    hist_Domain: string

    @IsNotEmpty()
    @IsNumber()
    tentative: number

    @IsNotEmpty()
    @IsDate()
    activateIn: Date

}
