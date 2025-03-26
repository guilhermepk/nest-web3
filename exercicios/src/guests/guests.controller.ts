import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { GuestsService } from "./guests.service";
import { CreateGuestDto } from "./dtos/create-guest.dto";
import { UpdateGuestDto } from "./dtos/update-guest.dto";

@Controller('guests')
export class GuestsController {
    constructor(
        private readonly service: GuestsService
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
        @Body() body: CreateGuestDto
    ){
        return this.service.create(body);
    }

    @Patch('update/:id')
    update(
        @Body() body: UpdateGuestDto,
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