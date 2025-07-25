import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    ) {}

    async create(createSubjectDto: CreateSubjectDto) {
        const existing = await this.subjectModel.findOne(createSubjectDto);
        if (existing) {
            throw new ConflictException('Tên môn học đã tồn tại!');
        }

        const subject  = new this.subjectModel(createSubjectDto);
        return subject.save();
    };

    findAll() {
        return this.subjectModel.find().exec();
    };

    findOne(id: string) {
        return this.subjectModel.findById(id).exec();
    }

    async update(id: string, updateSubjectDto: UpdateSubjectDto) {    
        const existing = await this.subjectModel.findOne({name: updateSubjectDto.name});
        if (existing && id !== existing._id.toString()) {
            throw new ConflictException('Tên môn học đã tồn tại!');
        }

        return this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true });
    };

    remove(id: string) {
        return this.subjectModel.findByIdAndDelete(id);
    }
}
