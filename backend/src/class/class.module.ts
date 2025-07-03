import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema';
import { Teacher, TeacherSchema } from 'src/teacher/schemas/teacher.schema';
import { Grade, GradeSchema } from 'src/grade/schemas/grade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Grade.name, schema: GradeSchema },
    ])
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
