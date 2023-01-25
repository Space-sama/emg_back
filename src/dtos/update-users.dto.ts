import { Book } from './../books/book.model';
import { IsOptional, IsString, IsMongoId, IsDate, IsBoolean, IsNumber } from "@nestjs/class-validator"


export class UpdateUserDTO {
    
    @IsOptional()
    @IsString()
    readonly firstName: string

    @IsOptional()
    @IsString()
    readonly lastName: string

    @IsOptional()
    @IsString()
    readonly CIN: string

    @IsOptional()
    @IsString()
    readonly sexe: string

    @IsOptional()
    @IsString()
    readonly profession: string

    @IsOptional()
    @IsString()
    public phone: number

    @IsOptional()
    @IsString()
    readonly email: string

    @IsOptional()
    @IsString()
    public password: string

    @IsDate()
    public updatedAt: string

    @IsOptional()
    @IsString()
    public status: string

    @IsOptional()
    @IsDate()
    public dateIssuedBook: Date

    @IsOptional()
    @IsDate()
    public dateRestitution: Date 

    @IsOptional()
    @IsDate()
    public daysLeft: string

    @IsOptional()
    @IsDate()
    public forTimeOf: string

    @IsOptional()
    @IsBoolean()
    shouldReturn: boolean

    @IsOptional()
    @IsBoolean()
    dateReturned: boolean

    @IsOptional()
    @IsBoolean()
    isReturned: boolean

    @IsOptional()
    @IsMongoId()
    public book: any

    @IsOptional()
    @IsString()
    hist_Book: string

    @IsOptional()
    @IsString()
    hist_ISBN: string

    @IsOptional()
    @IsString()
    hist_ID: string

    @IsOptional()
    @IsString()
    hist_LOC: string

    @IsOptional()
    @IsString()
    hist_Domain: string

    @IsOptional()
    @IsNumber()
    tentative: string

    @IsOptional()
    @IsDate()
    activateIn: Date
    
}