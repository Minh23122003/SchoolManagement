import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { Class, ClassSchema } from 'src/class/schemas/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Class.name, schema: ClassSchema },
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
