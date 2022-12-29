import { Category } from './../categories/category.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type Book_Req_Document = Book_Req & mongoose.Document

@Schema()
export class Book_Req {


    @Prop()
    nameBook: string

    @Prop()
    author: string

    @Prop()
    pages: number

    @Prop()
    faculty: string

    @Prop()
    bookType: string

    @Prop({type: String, enum: ['Active', 'Inactive']})
    status: string

    @Prop({type: String, enum: ['purchased', 'in_progress']})
    availibility: string

    @Prop()
    applicant: string

    @Prop()
    phone: string

    @Prop()
    email: string

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    // Category = Domain
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
    domain: Category
}
export const Book_Req_Schema = SchemaFactory.createForClass(Book_Req)