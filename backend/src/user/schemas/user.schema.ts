import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({
    timestamps: true, 
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
    }
}})
export class User {
    @Prop({required: true, unique: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, enum: ['admin', 'staff', 'teacher']})
    role: 'admin' | 'staff' | 'teacher';
}

export const UserSchema = SchemaFactory.createForClass(User);