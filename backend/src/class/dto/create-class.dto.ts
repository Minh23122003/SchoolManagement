import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMongoId()
    teacher: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    grade: string;
}
