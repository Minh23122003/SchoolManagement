import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SchoolYearDocument = SchoolYear & Document;

@Schema({timestamps: true})
export class SchoolYear {
    @Prop({required: true, unique: true})
    name: string;
}

export const SchoolYearSchema = SchemaFactory.createForClass(SchoolYear);