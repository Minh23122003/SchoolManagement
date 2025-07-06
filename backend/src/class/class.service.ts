import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './schemas/class.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClassService {
  constructor(
      @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const existingName = await this.classModel.findOne({name: createClassDto.name});
        if (existingName) {
            throw new ConflictException('Tên lớp học đã tồn tại!');
        }
    const existingTeacher = await this.classModel.findOne({teacher: createClassDto.teacher});
    if (existingTeacher) {
        throw new ConflictException('Giáo viên đã thuộc 1 lớp khác!');
    }
    
    const Class  = new this.classModel(createClassDto);
    return Class.save();
  }

  findAll() {
    return this.classModel.find().populate(['teacher', 'grade']).exec();
  }

  findOne(id: string) {
    return this.classModel.findById(id).populate(['teacher', 'grade']).exec();
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const existingName = await this.classModel.findOne({name: updateClassDto.name});
    if (existingName && id !== existingName._id.toString()) {
        throw new ConflictException('Tên lớp học đã tồn tại!');
    }

    const existingTeacher = await this.classModel.findOne({teacher: updateClassDto.teacher});
    if (existingTeacher && id !== existingTeacher._id.toString()) {
        throw new ConflictException('Giáo viên đã thuộc 1 lớp khác!');
    }

    return this.classModel.findByIdAndUpdate(id, updateClassDto, { new: true });
  }

  remove(id: string) {
    return this.classModel.findByIdAndDelete(id);
  }
}
