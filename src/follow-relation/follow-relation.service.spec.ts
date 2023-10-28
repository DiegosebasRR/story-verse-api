import { Test, TestingModule } from '@nestjs/testing';
import { FollowRelationService } from './follow-relation.service';

describe('FollowRelationService', () => {
  let service: FollowRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowRelationService],
    }).compile();

    service = module.get<FollowRelationService>(FollowRelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
