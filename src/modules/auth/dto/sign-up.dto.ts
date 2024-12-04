import { IsString, MinLength } from 'class-validator';

import { Trim } from '@/libs/transformers/string.transformer';

export class SignUpDto {
  @Trim()
  @IsString()
  @MinLength(3)
  username: string;

  @Trim()
  @IsString()
  @MinLength(6)
  password: string;
}
