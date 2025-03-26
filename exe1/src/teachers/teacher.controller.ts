import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { TeachersService } from "./teachers.service";

@Controller('teachers')
export class TeachersController {
    constructor(
        private readonly service: TeachersService
    ){}

    @Get('find-all')
    findAll(){
        return this.service.findAll();
    }

    @Get('find-by-id/:id')
    findById(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.service.findById(id);
    }
}