import { Injectable, ConflictException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { Model } from 'mongoose';

@Injectable()
export class StaffService {

  constructor (@InjectModel(Staff.name) private staffModel: Model<StaffDocument>) {};

  async create(createStaffDto: CreateStaffDto) {
    const existing = await this.staffModel.findOne({user: createStaffDto.user});
      if (existing) {
        throw new ConflictException('Tên tài khoản đã được đăng ký ở một staff khác!');
      }

    const created = new this.staffModel(createStaffDto);
    return created.save();
  }

  findAll() {
    return this.staffModel.find().populate('user').exec();
  }

  findOne(id: string) {
    return this.staffModel.findById(id).populate('user').exec();
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const existing = await this.staffModel.findOne({user: updateStaffDto.user});
    if (existing && existing._id !== id) {
      throw new ConflictException('Tên tài khoản đã được đăng ký ở một staff khác!');
    }

    return this.staffModel.findByIdAndUpdate(id, updateStaffDto, {new: true});
  }

  remove(id: string) {
    return this.staffModel.findByIdAndDelete(id);
  }
}
