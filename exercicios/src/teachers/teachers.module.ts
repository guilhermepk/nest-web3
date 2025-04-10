import { Module } from "@nestjs/common";
import { TeachersController } from "./teacher.controller";
import { TeachersService } from "./teachers.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [
        TeachersController
    ],
    providers: [
        TeachersService
    ]
})
export class TeachersModule { }