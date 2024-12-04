import { IsMongoId } from 'class-validator';

export class GetUserRankQueryDto {
  @IsMongoId()
  userId: string;
}
