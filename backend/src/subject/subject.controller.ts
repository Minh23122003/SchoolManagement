import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {};

    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectService.create(createSubjectDto);
    }

    @Get()
    findAll() {
        return this.subjectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSubjectDto: UpdateSubjectDto,
    ) {
        return this.subjectService.update(id, updateSubjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subjectService.remove(id);
    }
}
