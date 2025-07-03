import { ConflictException, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Score, ScoreDocument } from './schemas/score.schema';
import { Model } from 'mongoose';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<ScoreDocument>,
  ) {}

  async create(createScoreDto: CreateScoreDto) {
    if(createScoreDto.type === '45m' || createScoreDto.type === 'final'){
      const existing = await this.scoreModel.findOne({
        subject: createScoreDto.subject,
        student: createScoreDto.student,
        semester: createScoreDto.semester,
        school_year: createScoreDto.school_year,
        type: createScoreDto.type
      });
      if (existing) {
        throw new ConflictException('Môn học đã có điểm kiểm tra!');
      }
    }else {
      const existing = await this.scoreModel.find({
        subject: createScoreDto.subject,
        student: createScoreDto.student,
        semester: createScoreDto.semester,
        school_year: createScoreDto.school_year,
        type: createScoreDto.type
      });
      if(existing.length === 3){
        throw new ConflictException('Môn học đã đủ điểm 15 phút!');
      }
    }

    const score  = new this.scoreModel(createScoreDto);
    return score.save();
  }

  findAll() {
    return this.scoreModel.find().populate(['subject', 'student', 'school_year']).exec();
  }

  findOne(id: string) {
    return this.scoreModel.findById(id).populate(['subject', 'student', 'school_year']).exec();
  }

  update(id: string, updateScoreDto: UpdateScoreDto) {
    return this.scoreModel.findByIdAndUpdate(id, updateScoreDto, { new: true });
  }

  remove(id: string) {
    return this.scoreModel.findByIdAndDelete(id);
  }
}
