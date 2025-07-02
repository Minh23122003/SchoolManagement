import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/schooldb'),
    SubjectModule,
    UserModule,
    AuthModule,
    StaffModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
