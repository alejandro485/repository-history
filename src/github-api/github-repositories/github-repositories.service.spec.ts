import { Test, TestingModule } from '@nestjs/testing';
import { GithubRepositoriesService } from './github-repositories.service';

describe('GithubRepositoriesService', () => {
  let service: GithubRepositoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubRepositoriesService],
    }).compile();

    service = module.get<GithubRepositoriesService>(GithubRepositoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
