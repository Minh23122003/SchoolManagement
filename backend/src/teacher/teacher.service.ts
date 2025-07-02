import { Injectable, ConflictException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {

  constructor (@InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>) {};

  async create(createTeacherDto: CreateTeacherDto) {
    const existing = await this.teacherModel.findOne({user: createTeacherDto.user});
    if (existing) {
      throw new ConflictException('Tên tài khoản đã được đăng ký ở một teacher khác!');
    }

    const created = new this.teacherModel(createTeacherDto);
    return created.save();
  }

  findAll() {
    return this.teacherModel.find().populate(['user', 'subject']).exec();
  }

  findOne(id: string) {
    return this.teacherModel.findById(id).populate(['user', 'subject']).exec();
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const existing = await this.teacherModel.findOne({user: updateTeacherDto.user});
    if (existing && existing._id !== id) {
      throw new ConflictException('Tên tài khoản đã được đăng ký ở một teacher khác!');
    }

    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, {new: true});
  }

  remove(id: string) {
    return this.teacherModel.findByIdAndDelete(id);
  }
}
