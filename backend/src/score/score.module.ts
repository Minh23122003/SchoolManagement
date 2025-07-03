import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schemas/score.schema';
import { Student, StudentSchema } from 'src/student/schemas/student.schema';
import { Subject, SubjectSchema } from 'src/subject/schemas/subject.schema';
import { SchoolYear, SchoolYearSchema } from 'src/school-year/schemas/school-year.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Score.name, schema: ScoreSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: SchoolYear.name, schema: SchoolYearSchema },
    ])
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
