import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type WarningDocument = Warning & mongoose.Document

@Schema()
export class Warning {

    @Prop()
    f_name: string


    @Prop()
    l_name: string

    @Prop()
    cin: string

    @Prop()
    w_one: Date

    @Prop()
    w_two: Date

    @Prop()
    w_three: Date

    @Prop()
    tentative: number

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    @Prop()
    activateIn: Date
}
export const WarningSchema = SchemaFactory.createForClass(Warning)