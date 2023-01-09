import { IsDate, IsNotEmpty, IsString } from "@nestjs/class-validator"


export class CreateAdminDTO {

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    pwd: string

    @IsNotEmpty()
    @IsString()
    track: string

    @IsNotEmpty()
    @IsString()
    profession: string
    
    @IsNotEmpty()
    @IsDate()
    createdAt: Date
}