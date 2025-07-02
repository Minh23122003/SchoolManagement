import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({message: "Tên tài khoản không được bỏ trống!"})
    @IsString()
    username: string;

    @IsNotEmpty({message: "Mật khẩu không được bỏ trống!"})
    @IsString()
    password: string;
}