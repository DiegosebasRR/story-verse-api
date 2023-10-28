import { Module } from '@nestjs/common';
import { FollowRelationController } from './follow-relation.controller';
import { FollowRelationService } from './follow-relation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/Schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FollowRelationController],
  providers: [FollowRelationService],
})
export class FollowRelationModule {}
