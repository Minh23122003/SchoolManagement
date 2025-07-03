import { IsNotEmpty, IsString } from "class-validator";

export class CreateGradeDto {
    @IsNotEmpty({message: "Tên khối không được bỏ trống!"})
    @IsString()
    name: string;
}
