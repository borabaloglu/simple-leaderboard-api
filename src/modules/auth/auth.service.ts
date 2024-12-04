import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';

import { jwtConfig } from '@/libs/configs/jwt.config';
import { InvalidCredentialsException, UsernameAlreadyExistsException } from '@/libs/exceptions/auth.exception';

import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';

import { User, UserDocument } from '@/modules/auth/schemas/user.schema';

import { SignInResponse, SignUpResponse } from '@/modules/auth/types/response.type';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUserByIds(ids: string[]): Promise<UserDocument[]> {
    return this.userModel.find({ _id: { $in: ids } });
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async signUp(dto: SignUpDto): Promise<SignUpResponse> {
    const { username, password } = dto;

    const exists = await this.userModel.exists({ username });
    if (exists) throw new UsernameAlreadyExistsException(username);

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const user = await this.userModel.create({ username, password: hashedPassword });

    return {
      user: { id: user.id, username },
      accessToken: this.generateToken(user.id, username),
    };
  }

  async signIn(dto: SignInDto): Promise<SignInResponse> {
    const { username, password } = dto;

    const user = await this.userModel.findOne({ username });
    if (!user) throw new InvalidCredentialsException();

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new InvalidCredentialsException();

    return {
      user: { id: user.id, username },
      accessToken: this.generateToken(user.id, username),
    };
  }

  private generateToken(id: string, username: string): string {
    return sign({ id, username }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }
}
