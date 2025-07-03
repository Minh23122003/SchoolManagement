import { Module } from '@nestjs/common';
import { SchoolYearService } from './school-year.service';
import { SchoolYearController } from './school-year.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolYear, SchoolYearSchema } from './schemas/school-year.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SchoolYear.name, schema: SchoolYearSchema}])
  ],
  controllers: [SchoolYearController],
  providers: [SchoolYearService],
})
export class SchoolYearModule {}
