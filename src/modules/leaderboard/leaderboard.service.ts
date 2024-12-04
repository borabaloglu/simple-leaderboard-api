import Redis from 'ioredis';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';

import { AuthPayload } from '@/libs/decorators/current-user.decorator';
import { UserHasNoScoreException, UserScoreAlreadyExistsException } from '@/libs/exceptions/leaderboard.exception';

import { SubmitScoreDto } from '@/modules/leaderboard/dto/submit-score.dto';
import { GetLeaderboardQueryDto } from '@/modules/leaderboard/dto/get-leaderboard-query.dto';
import { GetUserRankQueryDto } from '@/modules/leaderboard/dto/get-user-rank-query.dto';

import { UserScore, UserScoreDocument } from '@/modules/leaderboard/schemas/user-score.schema';

import { AuthService } from '@/modules/auth/auth.service';

import {
  GetLeaderboardResponse,
  GetUserRankResponse,
  SubmitScoreResponse,
} from '@/modules/leaderboard/types/response.type';

@Injectable()
export class LeaderboardService {
  private readonly LEADERBOARD_KEY = 'leaderboard';

  constructor(
    private readonly authService: AuthService,
    @InjectModel(UserScore.name)
    private readonly userScoreModel: Model<UserScoreDocument>,
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  async getLeaderboard(query: GetLeaderboardQueryDto): Promise<GetLeaderboardResponse> {
    const { page, limit } = query;

    const start = (page - 1) * limit;
    const stop = start + limit - 1;

    const results = await this.redis.zrevrange(this.LEADERBOARD_KEY, start, stop, 'WITHSCORES');

    const entries: GetLeaderboardResponse = [];

    const ids = results.filter((_, index) => index % 2 === 0);
    const users = await this.authService.getUserByIds(ids);

    for (let i = 0; i < results.length; i += 2) {
      const userId = results[i];
      const user = users.find((user) => user.id === userId);
      const score = parseFloat(results[i + 1]);
      const rank = start + entries.length + 1;

      entries.push({
        username: user.username,
        score,
        rank,
      });
    }

    return entries;
  }

  async getUserRank(dto: GetUserRankQueryDto): Promise<GetUserRankResponse> {
    const { userId } = dto;

    const [score, rank] = await Promise.all([
      this.redis.zscore(this.LEADERBOARD_KEY, userId),
      this.redis.zrevrank(this.LEADERBOARD_KEY, userId),
    ]);

    if (score === null || rank === null) throw new UserHasNoScoreException(userId);

    return {
      userId,
      score: parseFloat(score),
      rank: rank + 1,
    };
  }

  async submitScore(user: AuthPayload, dto: SubmitScoreDto): Promise<SubmitScoreResponse> {
    const { gameId, score } = dto;

    try {
      await this.userScoreModel.create({
        gameId,
        user: user.id,
        score,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new UserScoreAlreadyExistsException(user.id, gameId);
      }
      throw error;
    }

    const currentScore = await this.redis.zscore(this.LEADERBOARD_KEY, user.id);
    const parsedCurrentScore = parseFloat(currentScore);
    if (!isNaN(parsedCurrentScore) && parsedCurrentScore >= score) {
      const rank = await this.redis.zrevrank(this.LEADERBOARD_KEY, user.id);
      return {
        userId: user.id,
        score: parsedCurrentScore,
        rank: rank + 1,
        gameId,
      };
    }

    await this.redis.zadd(this.LEADERBOARD_KEY, score, user.id);
    const rank = await this.redis.zrevrank(this.LEADERBOARD_KEY, user.id);

    return {
      userId: user.id,
      score,
      rank: rank + 1,
      gameId,
    };
  }
}
