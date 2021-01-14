import { Module } from '@nestjs/common';
import { GithubRepositoriesService } from './github-repositories/github-repositories.service';
import { GithubBranchesService } from './github-branches/github-branches.service';
import { GithubCommitsService } from './github-commits/github-commits.service';
import { GithubLinkProcessService } from './github-link-process/github-link-process.service';

@Module({
  providers: [
    GithubRepositoriesService,
    GithubBranchesService,
    GithubCommitsService,
    GithubLinkProcessService,
  ],
  exports: [
    GithubRepositoriesService,
    GithubBranchesService,
    GithubCommitsService,
  ],
})
export class GithubApiModule {}
