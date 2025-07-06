import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEnum(['male', 'female', 'other'])
    gender: 'male' | 'female' | 'other';

    @IsString()
    @IsNotEmpty()
    birthday: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsMongoId()
    class: string;
}
