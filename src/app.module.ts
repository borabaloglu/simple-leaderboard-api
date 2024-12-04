import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoConfig } from '@/libs/configs/mongo.config';

import { AuthModule } from '@/modules/auth/auth.module';
import { LeaderboardModule } from '@/modules/leaderboard/leaderboard.module';

@Module({
  imports: [MongooseModule.forRoot(mongoConfig.url), AuthModule, LeaderboardModule],
})
export class AppModule {}
