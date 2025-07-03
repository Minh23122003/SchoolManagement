import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { TeacherModule } from './teacher/teacher.module';
import { SchoolYearModule } from './school-year/school-year.module';
import { GradeModule } from './grade/grade.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { ScoreModule } from './score/score.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/schooldb'),
    SubjectModule,
    UserModule,
    AuthModule,
    StaffModule,
    TeacherModule,
    SchoolYearModule,
    GradeModule,
    ClassModule,
    StudentModule,
    ScoreModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
