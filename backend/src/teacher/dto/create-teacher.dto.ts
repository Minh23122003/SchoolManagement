import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;
    
    @IsEnum(['male', 'female', 'other'])
    gender: 'male' | 'female' | 'other';
       
    @IsString()
    @IsNotEmpty()
    address?: string;
    
    @IsString()
    @IsNotEmpty()
    phone?: string;
    
    @IsEmail()
    @IsNotEmpty()
    email?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    user: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    subject: string;
}
