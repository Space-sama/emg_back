import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type CategoryDocument = Category & mongoose.Document

@Schema()
export class Category {

    @Prop()
    label: string

    @Prop({type: String, enum: ['Active', 'Inactive']})
    status: string

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}
export const CategorySchema = SchemaFactory.createForClass(Category)