import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SubmitScoreDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsNumber()
  @Min(0)
  score: number;
}
