import { UserRank } from '@/modules/leaderboard/interfaces/user-rank.interface';

export type GetLeaderboardResponse = UserRank[];

export type GetUserRankResponse = UserRank;

export type SubmitScoreResponse = UserRank & { gameId: string };
