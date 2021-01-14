import { Test, TestingModule } from '@nestjs/testing';
import { GithubLinkProcessService } from './github-link-process.service';

describe('GithubLinkProcessService', () => {
  let service: GithubLinkProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubLinkProcessService],
    }).compile();

    service = module.get<GithubLinkProcessService>(GithubLinkProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
