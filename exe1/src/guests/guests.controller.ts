import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { GuestsService } from "./guests.service";

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
}