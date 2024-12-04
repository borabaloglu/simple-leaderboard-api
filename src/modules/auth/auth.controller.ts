import { Body, Controller, Post } from '@nestjs/common';

import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';

import { AuthService } from '@/modules/auth/auth.service';

import { SignInResponse, SignUpResponse } from '@/modules/auth/types/response.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() dto: SignInDto): Promise<SignInResponse> {
    return this.service.signIn(dto);
  }

  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto): Promise<SignUpResponse> {
    return this.service.signUp(dto);
  }
}
