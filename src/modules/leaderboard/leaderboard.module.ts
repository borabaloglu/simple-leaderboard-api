import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RedisModule } from '@/libs/redis/redis.module';

import { LeaderboardController } from '@/modules/leaderboard/leaderboard.controller';

import { UserScore, UserScoreSchema } from '@/modules/leaderboard/schemas/user-score.schema';

import { LeaderboardService } from '@/modules/leaderboard/leaderboard.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserScore.name, schema: UserScoreSchema }]), RedisModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
