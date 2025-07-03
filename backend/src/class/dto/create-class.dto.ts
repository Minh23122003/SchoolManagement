import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsMongoId()
    teacher?: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    grade: string;
}
