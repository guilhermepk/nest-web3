import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";
import { GuestsService } from "./guests.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [GuestsController],
    providers: [GuestsService],
})
export class GuestsModule { }