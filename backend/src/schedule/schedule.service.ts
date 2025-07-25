import { ConflictException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './schemas/schedule.schema';
import { Model } from 'mongoose';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const existing = await this.scheduleModel.findOne(createScheduleDto);
    if (existing) {
      throw new ConflictException('Lịch dạy đã tồn tại!');
    }

    const schedule  = new this.scheduleModel(createScheduleDto);
    return schedule.save();
  }

  findAll() {
    return this.scheduleModel.find().populate(['class', 'teacher', 'subject', 'school_year']).exec();
  }

  findOne(id: string) {
    return this.scheduleModel.findById(id).populate(['class', 'teacher', 'subject', 'school_year']).exec();
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const existing = await this.scheduleModel.findOne({
      subject: updateScheduleDto.subject,
      teacher: updateScheduleDto.teacher,
      class: updateScheduleDto.class,
      semester: updateScheduleDto.semester,
      school_year: updateScheduleDto.school_year,
      period: updateScheduleDto.period,
      weekday: updateScheduleDto.weekday,
      session: updateScheduleDto.session,
    });
    if (existing && id !== existing._id.toString()) {
      throw new ConflictException('Lịch dạy đã tồn tại!');
    }
    return this.scheduleModel.findByIdAndUpdate(id, updateScheduleDto, { new: true });
  }

  remove(id: string) {
    return this.scheduleModel.findByIdAndDelete(id);
  }
}
