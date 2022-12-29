import { IsOptional, IsString, IsNumber, IsDate, IsIn, IsMongoId } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class UpdateReqBookDTO {

    @IsOptional()
    @IsString()
    @Prop({required: true})
    readonly nameBook: string

    @IsOptional()
    @IsString()
    @Prop({required: true})
    readonly author: string

    @IsOptional()
    @IsNumber()
    @Prop({required: true})
    readonly pages: number

    @IsOptional()
    @IsString()
    @Prop({required: true})
    readonly faculty: string

    @IsOptional()
    @IsString()
    public bookType: string

    @IsOptional()
    @IsString()
    @IsIn(['Active', 'Inactive'])
    public status: string

    @IsOptional()
    @IsString()
    @IsIn(['purchased', 'in_progress'])
    public availibility: string

    @IsOptional()
    @IsString()
    public daysLeft: string

    @IsOptional()
    @IsString()
    applicant: string

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsDate()
    public createdAt: string

    @IsOptional()
    @IsDate()
    public updatedAt: string

    @IsOptional()
    @IsMongoId()
    public domain: any
    
}
