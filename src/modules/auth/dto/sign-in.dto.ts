import { IsString } from 'class-validator';

import { Trim } from '@/libs/transformers/string.transformer';

export class SignInDto {
  @Trim()
  @IsString()
  username: string;

  @Trim()
  @IsString()
  password: string;
}
