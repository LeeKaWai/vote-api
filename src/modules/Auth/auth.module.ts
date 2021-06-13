import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import {
  Schema as UserSchema,
  CollectionName as UserCollectionName,
  UserModule,
} from '../User';

import {
  Schema as MemberSchema,
  CollectionName as MemberCollectionName,
  MemberModule,
} from '../Member';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCollectionName, schema: UserSchema },
    ]),
    MongooseModule.forFeature([
      { name: MemberCollectionName, schema: MemberSchema },
    ]),
    UserModule,
    MemberModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
