import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ClassDocument = Class & Document;

@Schema({timestamps: true, })
export class Class {
    @Prop({required: true, unique: true})
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Grade', required: true})
    grade: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Teacher', required: false, unique: true })
    teacher?: Types.ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);