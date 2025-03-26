import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";
import { GuestsService } from "./guests.service";

@Module({
    imports: [],
    controllers: [
        GuestsController
    ],
    providers: [
        GuestsService
    ],
})
export class GuestsModule {}