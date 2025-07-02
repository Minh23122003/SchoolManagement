import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubjectDto {
    @IsNotEmpty({message: "Tên môn học không được bỏ trống!"})
    @IsString()
    name: string;
}