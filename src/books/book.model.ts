import { Category } from './../categories/category.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type BookDocument = Book & mongoose.Document

@Schema()
export class Book {

    @Prop()
    nameBook: string


    @Prop()
    identifiant: string

    @Prop()
    location: string

    @Prop()
    ISBN: string

    @Prop()
    author: string

    @Prop()
    pages: number

    @Prop()
    faculty: string

    @Prop()
    edition: Date

    @Prop()
    editor: string

    @Prop()
    bookType: string

    @Prop()
    counter: number

    @Prop({type: String, enum: ['Active', 'Inactive']})
    status: string

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
    
    @Prop({default: false})
    isIssued: Boolean

    @Prop({default: false})
    shouldBeReturned: Boolean

    @Prop({default: ""})
    issuedByFirstName: String

    @Prop({default: ""})
    issuedByLastName: String

    @Prop({type: String})
    keyWords: String

    // Category = Domain
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
    domain: Category
}
export const BookSchema = SchemaFactory.createForClass(Book)