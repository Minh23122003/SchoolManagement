import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private jwtService: JwtService,
        private userService: UserService,
    ) {}
    
    async login(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
    
        if (!user) {
            throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
        }
    
        const payload = { sub: user._id, username: user.username, role: user.role };
    
        return {
            access_token: this.jwtService.sign(payload),
            role: user.role,
        };
    }
}
