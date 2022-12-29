import { IsNotEmpty, IsString, IsOptional, IsDate, IsIn } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class UpdateCategoryDTO {

    @IsOptional()
    @IsString()
    @Prop({required: true})
    readonly label: string

    @IsOptional()
    @IsString()
    @IsIn(['Active', 'Inactive'])
    public status: string

    @IsNotEmpty()
    @IsDate()
    public updatedAt: string
    
}
