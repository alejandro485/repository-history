import { Module } from '@nestjs/common';
import { GithubRepositoriesService } from './github-repositories/github-repositories.service';
import { GithubBranchesService } from './github-branches/github-branches.service';
import { GithubCommitsService } from './github-commits/github-commits.service';

@Module({
  providers: [
    GithubRepositoriesService,
    GithubBranchesService,
    GithubCommitsService,
  ],
  exports: [
    GithubRepositoriesService,
    GithubBranchesService,
    GithubCommitsService,
  ],
})
export class GithubApiModule {}
