import { IsNotEmpty, IsString, IsDate, IsIn } from "@nestjs/class-validator"
import { Prop } from "@nestjs/mongoose"

export class CreateCategoryDTO {

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    readonly label: string

    @IsNotEmpty()
    @IsString()
    @IsIn(['Active', 'Inactive'])
    public status: string

    @IsNotEmpty()
    @IsDate()
    public createdAt: string

    @IsNotEmpty()
    @IsDate()
    public updatedAt: string
    
}
