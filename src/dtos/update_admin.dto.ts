import { IsDate, IsOptional, IsString } from "@nestjs/class-validator"

export class UpdateAdminDTO {

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    pwd: string

    @IsOptional()
    @IsString()
    track: string

    @IsOptional()
    @IsString()
    profession: string
    
    @IsOptional()
    @IsDate()
    createdAt: Date
}