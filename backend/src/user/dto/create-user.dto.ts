import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "Tên tài khoản không được bỏ trống!"})
    @IsString()
    username: string;

    @IsNotEmpty({message: "Mật khẩu không được bỏ trống!"})
    @IsString()
    password: string;

    @IsNotEmpty({message: "Vai trò không được bỏ trống!"})
    @IsIn(['admin', 'staff', 'teacher'], {message: "Vai trò phải là admin hoặc staff hoặc teacher"})
    role: 'admin' | 'staff' | 'teacher';
}