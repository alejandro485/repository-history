import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubApiModule } from './github-api/github-api.module';
import { PaginationModule } from './pagination/pagination.module';
import { GetBranchesService } from './get-branches/get-branches.service';
import { GetCommitsService } from './get-commits/get-commits.service';

@Module({
  imports: [ GithubApiModule, PaginationModule ],
  controllers: [ AppController ],
  providers: [ AppService, GetBranchesService, GetCommitsService ],
})
export class AppModule {}
