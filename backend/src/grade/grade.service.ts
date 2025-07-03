import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Grade, GradeDocument } from './schemas/grade.schema';
import { Model } from 'mongoose';

@Injectable()
export class GradeService {
  constructor(
      @InjectModel(Grade.name) private gradeModel: Model<GradeDocument>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const existing = await this.gradeModel.findOne(createGradeDto);
    if (existing) {
        throw new ConflictException('Tên khối đã tồn tại!');
    }
    
    const grade  = new this.gradeModel(createGradeDto);
    return grade.save();
  }

  findAll() {
    return this.gradeModel.find().exec();
  }

  findOne(id: string) {
    return this.gradeModel.findById(id).exec();
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    const existing = await this.gradeModel.findOne({name: updateGradeDto.name});
    if (existing && id !== existing._id.toString()) {
        throw new ConflictException('Tên khối đã tồn tại!');
    }

    return this.gradeModel.findByIdAndUpdate(id, updateGradeDto, { new: true });
  }

  remove(id: string) {
    return this.gradeModel.findByIdAndDelete(id);
  }
}
