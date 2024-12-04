import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { AuthPayload, CurrentUser } from '@/libs/decorators/current-user.decorator';
import { MainAuthGuard } from '@/libs/guards/main-auth.guard';

import { GetLeaderboardQueryDto } from '@/modules/leaderboard/dto/get-leaderboard-query.dto';
import { GetUserRankQueryDto } from '@/modules/leaderboard/dto/get-user-rank-query.dto';
import { SubmitScoreDto } from '@/modules/leaderboard/dto/submit-score.dto';

import { LeaderboardService } from '@/modules/leaderboard/leaderboard.service';

import {
  GetLeaderboardResponse,
  GetUserRankResponse,
  SubmitScoreResponse,
} from '@/modules/leaderboard/types/response.type';

@Controller('leaderboard')
@UseGuards(MainAuthGuard)
export class LeaderboardController {
  constructor(private readonly service: LeaderboardService) {}

  @Get('/top')
  getLeaderboard(@Query() query: GetLeaderboardQueryDto): Promise<GetLeaderboardResponse> {
    return this.service.getLeaderboard(query);
  }

  @Get('/rank')
  getUserRank(@Query() query: GetUserRankQueryDto): Promise<GetUserRankResponse> {
    return this.service.getUserRank(query);
  }

  @Post('/submit-score')
  submitScore(@Body() dto: SubmitScoreDto, @CurrentUser() user: AuthPayload): Promise<SubmitScoreResponse> {
    return this.service.submitScore(user, dto);
  }
}
