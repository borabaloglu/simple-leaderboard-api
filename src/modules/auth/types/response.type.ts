import { UserDocument } from '@/modules/auth/schemas/user.schema';

export type SignInResponse = {
  user: {
    id: UserDocument['id'];
    username: UserDocument['username'];
  };
  accessToken: string;
};

export type SignUpResponse = {
  user: {
    id: UserDocument['id'];
    username: UserDocument['username'];
  };
  accessToken: string;
};
