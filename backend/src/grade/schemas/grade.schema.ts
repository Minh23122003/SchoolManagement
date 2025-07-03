import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GradeDocument = Grade & Document;

@Schema({timestamps: true})
export class Grade {
    @Prop({required: true, unique: true})
    name: string;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);