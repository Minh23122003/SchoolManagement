import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ScoreDocument = Score & Document;

@Schema({timestamps: true})
export class Score {
    @Prop({required: true})
    score: number;

    @Prop({required: true, enum: ['15m', '45m', 'final']})
    type: '15m' | '45m' | 'final';

    @Prop({required: true, enum: [1, 2]})
    semester: 1 | 2;

    @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
    student: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
    subject: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'SchoolYear', required: true })
    school_year: Types.ObjectId;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);