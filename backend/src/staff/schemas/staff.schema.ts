import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type StaffDocument = Staff & Document;

@Schema()
export class Staff {
    @Prop({ required: true })
    full_name: string;

    @Prop({ required: true })
    gender: 'male' | 'female' | 'other';

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    user: Types.ObjectId;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);