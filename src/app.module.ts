import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoConfig } from '@/libs/configs/mongo.config';

import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(mongoConfig.url), AuthModule],
})
export class AppModule {}
