import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolYear, SchoolYearDocument } from './schemas/school-year.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchoolYearService {
  constructor(
      @InjectModel(SchoolYear.name) private schoolYearModel: Model<SchoolYearDocument>,
  ) {}

  async create(createSchoolYearDto: CreateSchoolYearDto) {
    const existing = await this.schoolYearModel.findOne(createSchoolYearDto);
    if (existing) {
        throw new ConflictException('Tên năm học đã tồn tại!');
    }
        
    const grade  = new this.schoolYearModel(createSchoolYearDto);
    return grade.save();
  }

  findAll() {
    return this.schoolYearModel.find().exec();
  }

  findOne(id: string) {
    return this.schoolYearModel.findById(id).exec();
  }

  async update(id: string, updateSchoolYearDto: UpdateSchoolYearDto) {
    const existing = await this.schoolYearModel.findOne({name: updateSchoolYearDto.name});
    if (existing && id !== existing._id.toString()) {
        throw new ConflictException('Tên năm học đã tồn tại!');
    }

    return this.schoolYearModel.findByIdAndUpdate(id, updateSchoolYearDto, { new: true });
  }

  remove(id: string) {
    return this.schoolYearModel.findByIdAndDelete(id);
  }
}
