import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GuestsModule } from './guests/guests.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    GuestsModule,
    TeachersModule,
    UsersModule,
    PrismaModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'teachers*', method: RequestMethod.ALL })
  }
}