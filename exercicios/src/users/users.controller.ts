import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

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

    @Post('create')
    create(
        @Body() body: CreateUserDto
    ){
        return this.service.create(body);
    }

    @Patch('update/:id')
    update(
        @Body() body: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number
    ){
        return this.service.update(body, id);
    }

    @Delete('delete/:id')
    delete(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.service.delete(id);
    }
}
