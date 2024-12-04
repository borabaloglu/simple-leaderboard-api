import { User } from '@/modules/auth/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserScoreDocument = HydratedDocument<UserScore>;

@Schema({
  id: true,
  versionKey: false,
})
export class UserScore {
  @Prop({
    required: true,
  })
  gameId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    required: true,
  })
  score: number;
}

export const UserScoreSchema = SchemaFactory.createForClass(UserScore);

UserScoreSchema.index({ gameId: 1, user: 1 }, { unique: true });
