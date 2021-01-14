import { Test, TestingModule } from '@nestjs/testing';
import { GithubCommitsService } from './github-commits.service';

describe('GithubCommitsService', () => {
  let service: GithubCommitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubCommitsService],
    }).compile();

    service = module.get<GithubCommitsService>(GithubCommitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
