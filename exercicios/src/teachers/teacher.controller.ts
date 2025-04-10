import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dtos/create-teacher.dto";
import { UpdateTeacherDto } from "./dtos/update-teacher.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller('teachers')
export class TeachersController {
    constructor(
        private readonly service: TeachersService
    ) { }

    @Get('find-all')
    findAll(
        @Query() params: PaginationDto
    ) {
        return this.service.findAll(params);
    }

    @Get('find-by-id/:id')
    findById(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.service.findById(id);
    }

    @Post('create')
    create(
        @Body() body: CreateTeacherDto
    ) {
        return this.service.create(body);
    }

    @Patch('update/:id')
    update(
        @Body() body: UpdateTeacherDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.service.update(body, id);
    }

    @Delete('delete/:id')
    delete(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.service.delete(id);
    }
}
