import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto) { 
        const existing = await this.userModel.findOne({ username: createUserDto.username });
        if (existing) {
            throw new ConflictException('Tên đăng nhập đã tồn tại!');
        }

        let hashedPassword = '';
        hashedPassword = await bcrypt.hash(createUserDto.password, 4);

        const user = new this.userModel({
            username: createUserDto.username,
            password: hashedPassword,
            role: createUserDto.role,
        });

        return await user.save();
    };
    
    findAll() {
        return this.userModel.find().exec();
    };

    findOne(id: string) {
        return this.userModel.findById(id).exec();
    }

    findByUsername(username: string) {
        return this.userModel.findOne({ username }).exec();
    }

    findByRole(role: string) {
        return this.userModel.find({role: role}).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {      
        const existing = await this.userModel.findOne({ username: updateUserDto.username });
        if (existing && id != existing._id.toString()) {
            throw new ConflictException('Tên tài khoản đã tồn tại!');
        }

        let hashedPassword = ''
        let updated = null;
        if(updateUserDto.password !== undefined && updateUserDto.password !== '') {
            hashedPassword = await bcrypt.hash(updateUserDto.password, 4);
            return await this.userModel.findByIdAndUpdate(id, {username: updateUserDto.username, role: updateUserDto.role, password: hashedPassword}, { new: true });
        } else {
            return await this.userModel.findByIdAndUpdate(id, {username: updateUserDto.username, role: updateUserDto.role, }, { new: true });
        }
    };

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}
