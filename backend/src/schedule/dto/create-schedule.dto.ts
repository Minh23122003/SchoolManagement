import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    class: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    subject: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    teacher: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    school_year: string;
    
    @IsEnum([1, 2])
    semester: 1 | 2;

    @IsEnum([1, 2, 3, 4, 5])
    period: 1 | 2 | 3 | 4 |5;

    @IsEnum(['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'])
    weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

    @IsEnum(['morning', 'afternoon'])
    session: 'morning' | 'afternoon';
}
