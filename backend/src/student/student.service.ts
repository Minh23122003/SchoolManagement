import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student  = new this.studentModel(createStudentDto);
    return student.save();
  }

  findAll() {
    return this.studentModel.find().populate('class').exec();
  }

  findOne(id: string) {
    return this.studentModel.findById(id).populate('class').exec();
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
  }

  remove(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }
}
