import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { FollowRelationService } from './follow-relation.service';

@Controller('follow-relation')
export class FollowRelationController {
  constructor(private readonly followRelationService: FollowRelationService) {}
  @Post(':userId/follow/:followedUserId')
  async followUser(
    @Param('userId') userId: string,
    @Param('followedUserId') followedUserId: string,
  ) {
    const user = await this.followRelationService.followUser(
      userId,
      followedUserId,
    );
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
  @Get(':userId')
  async getFollowersById(@Param('userId') userId: string) {
    const followers = await this.followRelationService.getFollowersById(userId);
    if (!followers) {
      throw new NotFoundException(
        'No se encontraron seguidores para el usuario dado',
      );
    }
    return followers;
  }
}
