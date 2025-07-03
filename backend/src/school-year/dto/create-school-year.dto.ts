import { IsNotEmpty, IsString } from "class-validator";

export class CreateSchoolYearDto {
    @IsNotEmpty({message: "Tên năm học không được bỏ trống!"})
    @IsString()
    name: string;
}
