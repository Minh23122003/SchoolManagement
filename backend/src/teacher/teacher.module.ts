import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Subject, SubjectSchema } from 'src/subject/schemas/subject.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Teacher.name, schema: TeacherSchema },
        { name: User.name, schema: UserSchema },
        { name: Subject.name, schema: SubjectSchema}
      ])
    ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
