import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schemas/schedule.schema';
import { Class, ClassSchema } from 'src/class/schemas/class.schema';
import { Subject, SubjectSchema } from 'src/subject/schemas/subject.schema';
import { SchoolYear, SchoolYearSchema } from 'src/school-year/schemas/school-year.schema';
import { Teacher, TeacherSchema } from 'src/teacher/schemas/teacher.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Schedule.name, schema: ScheduleSchema },
        { name: Class.name, schema: ClassSchema },
        { name: Subject.name, schema: SubjectSchema },
        { name: Teacher.name, schema: TeacherSchema },
        { name: SchoolYear.name, schema: SchoolYearSchema },
      ])
    ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
