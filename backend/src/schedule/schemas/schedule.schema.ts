import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ScheduleDocument = Schedule & Document;

@Schema({timestamps: true})
export class Schedule {
    @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
    class: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
    subject: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
    teacher: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'SchoolYear', required: true })
    school_year: Types.ObjectId;

    @Prop({required: true, enum: [1, 2]})
    semester: 1 | 2;

    @Prop({required: true, enum: [1, 2, 3, 4, 5]})
    period: 1 | 2 | 3 | 4 |5;

    @Prop({required: true, enum: ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']})
    weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

    @Prop({required: true, enum: ['morning', 'afternoon']})
    session: 'morning' | 'afternoon';
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);