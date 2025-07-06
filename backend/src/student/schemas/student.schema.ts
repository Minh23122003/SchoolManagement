import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type StudentDocument = Student & Document;

@Schema({timestamps: true, })
export class Student {
    @Prop({required: true, unique: true})
    first_name: string;

    @Prop({required: true, unique: true})
    last_name: string;

    @Prop({ required: true })
    gender: 'male' | 'female' | 'other';

    @Prop({required: true})
    birthday: string;

    @Prop({required: true})
    address: string;

    @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
    class: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);