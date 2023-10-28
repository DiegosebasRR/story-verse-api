import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/Schemas/user.schema';

@Injectable()
export class FollowRelationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  //seguir a usuario
  async followUser(userId: string, followedUserId: string) {
    const user = await this.userModel.findById(userId).exec();
    const followedUser = await this.userModel.findById(followedUserId).exec();

    if (!user || !followedUser) {
      throw new Error('Usuario o usuario seguido no encontrado');
    }

    if (!followedUser.followers.includes(user._id)) {
      followedUser.followers.push(user._id);
    }
    await followedUser.save();
    return followedUser.followers;
  }
  //obtener seguidores por id
  async getFollowersById(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const followers = await this.userModel
      .find({ _id: { $in: user.followers } })
      .exec();

    const followersData = followers.map((follower) => {
      return {
        id: follower._id,
        username: follower.username,
      };
    });

    return followersData;
  }
}
