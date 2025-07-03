import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScoreDto {
    @IsNumber()
    @IsNotEmpty()
    score: number

    @IsEnum(['15m', '45m', 'final'])
    type: '15m' | '45m' | 'final';

    @IsEnum([1, 2])
    semester: 1 | 2;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    subject: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    student: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    school_year: string;
}
