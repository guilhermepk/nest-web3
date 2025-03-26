import { Module } from '@nestjs/common';
import { GuestsModule } from './guests/guests.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GuestsModule,
    TeachersModule,
    UsersModule
  ],
})
export class AppModule {}
