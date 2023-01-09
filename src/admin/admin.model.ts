import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type AdminDocument = Admin & mongoose.Document

@Schema()
export class Admin {
    
    // @Prop()
    // _id?: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    email: string
    
    @Prop()
    pwd: string

    @Prop()
    track: string

    @Prop({type: String})
    profession: string
    
    @Prop()
    createdAt: Date
}
export const AdminSchema = SchemaFactory.createForClass(Admin)