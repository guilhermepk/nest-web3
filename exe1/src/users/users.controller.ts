import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly service: UsersService
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