import { Category } from './../categories/category.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type BookParetoDocument = Pareto_Book & mongoose.Document

@Schema()
export class Pareto_Book {

    @Prop()
    nameBook: string

    @Prop()
    identifiant: string

    @Prop()
    location: string

    @Prop()
    counter: number

    @Prop({type: Number})
    cumulEmprunt: number

    @Prop({type: Number})
    pourcentage: number

    @Prop({type: Number})
    cumulPourcentage: number

    @Prop({type: Number})
    bookPourcentage: number

    @Prop()
    domain: string
}
export const ParetoBookSchema = SchemaFactory.createForClass(Pareto_Book)