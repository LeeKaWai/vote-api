import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './core/guards';

import { AppController } from './app.controller';
import { ActivityModule } from './modules/Activity/activity.module';
import { AuthModule } from './modules/Auth/auth.module';
import { CacheModule } from './modules/Cache/cache.module';
import { MemberModule } from './modules/Member/member.module';
import { VoteLogModule } from './modules/VoteLog/voteLog.module';
import { UserModule } from './modules/User/user.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      // eslint-disable-next-line max-len
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.DATABASE}?authSource=admin`,
    ),
    CacheModule.forRoot({
      url: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
    }),
    AuthModule,
    ActivityModule,
    MemberModule,
    UserModule,
    VoteLogModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
