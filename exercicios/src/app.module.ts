import { Module } from '@nestjs/common';
import { GuestsModule } from './guests/guests.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GuestsModule,
    TeachersModule,
    UsersModule,
    PrismaModule
  ],
})
export class AppModule { }
