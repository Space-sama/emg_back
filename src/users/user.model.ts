import { Book } from './../books/book.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import * as moment from 'moment'
import { Transform } from '@nestjs/class-transformer';

export type UserDocument = User & mongoose.Document

@Schema()
export class User {
    
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    CIN: string

    @Prop({type: String})
    sexe: string

    @Prop({type: String})
    profession: string

    @Prop()
    phone: string

    @Prop()
    email: string
    
    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    @Prop({type: String, enum: ['Active', 'Inactive']})
    status: string

    @Prop()
    dateIssuedBook: Date

    @Prop()
    dateRestitution: Date


    @Prop()
    forTimeOf: Number

    
    @Prop()
    daysLeft: Number

    // @Prop()
    // numberOfDays: number

    @Prop({default: false})
    shouldReturn: boolean

    @Prop({default: false})
    isReturned: boolean

    @Prop({default: null})
    dateReturned: Date

    @Prop({default: ""})
    hist_Book: string

    @Prop({default: ""})
    hist_ISBN: string

    @Prop({default: ""})
    hist_ID: string

    @Prop({default: ""})
    hist_LOC: string

    @Prop({default: ""})
    hist_Domain: string

    @Prop()
    tentative: number

    @Prop()
    activateIn: Date

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }])
    book: Book[]
}
export const UserSchema = SchemaFactory.createForClass(User)