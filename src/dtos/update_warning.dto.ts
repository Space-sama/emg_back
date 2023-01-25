import { Prop } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator"

export class UpdateWarningDTO {

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Prop({required: true})
    readonly f_name: string
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly l_name: string
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Prop({unique: true})
    readonly cin: string
    
    @IsNotEmpty()
    @IsOptional()
    @IsDate()
    readonly w_one: Date
    
    @IsNotEmpty()
    @IsOptional()
    @IsDate()
    readonly w_two: Date
    
    @IsNotEmpty()
    @IsOptional()
    @IsDate()
    readonly w_three: Date
    
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    readonly tentative: Number
    
    @Prop()
    @IsDate()
    createdAt: Date
    
    @Prop()
    @IsOptional()
    @IsDate()
    updatedAt: string

    @Prop()
    @IsOptional()
    @IsDate()
    activateIn: Date

    
}