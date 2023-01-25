import { IsOptional } from '@nestjs/class-validator';
import { IsNumber } from '@nestjs/class-validator';
import { IsDate } from '@nestjs/class-validator';
import { Prop } from '@nestjs/mongoose';
import { IsString } from '@nestjs/class-validator';
import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateWarningDTO {

@IsNotEmpty()
@IsString()
@Prop({required: true})
readonly f_name: string

@IsNotEmpty()
@IsString()
@Prop({required: true})
readonly l_name: string

@IsNotEmpty()
@IsString()
@Prop({required: true, unique: true})
readonly cin: string

@IsOptional()
@IsDate()
readonly w_one: Date

@IsOptional()
@IsDate()
readonly w_two: Date

@IsOptional()
@IsDate()
readonly w_three: Date

@IsNotEmpty()
@IsNumber()
readonly tentative: Number

@Prop()
@IsDate()
createdAt: Date

@Prop()
@IsOptional()
updatedAt: Date

@Prop()
@IsOptional()
activateIn: Date



}
