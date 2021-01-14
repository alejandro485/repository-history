import { Test, TestingModule } from '@nestjs/testing';
import { GithubBranchesService } from './github-branches.service';

describe('GithubBranchesService', () => {
  let service: GithubBranchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubBranchesService],
    }).compile();

    service = module.get<GithubBranchesService>(GithubBranchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
