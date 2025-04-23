import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";
import { GuestsService } from "./guests.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeachersModule } from "src/teachers/teachers.module";

@Module({
    imports: [PrismaModule, TeachersModule],
    controllers: [GuestsController],
    providers: [GuestsService],
})
export class GuestsModule { }