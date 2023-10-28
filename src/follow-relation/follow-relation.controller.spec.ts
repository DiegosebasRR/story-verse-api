import { Test, TestingModule } from '@nestjs/testing';
import { FollowRelationController } from './follow-relation.controller';

describe('FollowRelationController', () => {
  let controller: FollowRelationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowRelationController],
    }).compile();

    controller = module.get<FollowRelationController>(FollowRelationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
