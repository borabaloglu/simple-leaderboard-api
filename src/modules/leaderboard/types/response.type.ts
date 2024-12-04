import { UserRank } from '@/modules/leaderboard/interfaces/user-rank.interface';

export type GetLeaderboardResponse = Omit<UserRank, 'userId'>[];

export type GetUserRankResponse = UserRank;

export type SubmitScoreResponse = UserRank & { gameId: string };
