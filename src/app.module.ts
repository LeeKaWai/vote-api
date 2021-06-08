import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { ActivityModule } from './modules/Activity/activity.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.DATABASE}?authSource=admin`,
    ),
    ScheduleModule.forRoot(),
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
