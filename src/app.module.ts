import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubApiModule } from './github-api/github-api.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [ GithubApiModule, PaginationModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
