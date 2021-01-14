import { Injectable } from '@nestjs/common';
import { GithubCommitsService } from '../github-api/github-commits/github-commits.service';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class GetCommitsService {

    constructor(
        private githubCommitsService: GithubCommitsService,
        private paginationService: PaginationService,
    ) { }

    public async getCommits(query: any) {
        let page = query.page;
        let limit = query.limit;
        let branch = query.branch;
        const fullname = process.env.FULLNAME_PATH;
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit || limit < 1) {
            limit = 10;
        }

        const queryCommits = {
            page,
            per_page: limit,
            sha: branch,
        };
        const results = await Promise.all([
            this.githubCommitsService.countCommitsByFullname(fullname),
            this.githubCommitsService.getCommitsByFullname(fullname, queryCommits),
        ]);
        const countResult = results[0];
        const commitsResult = results[1];
        if (commitsResult.status == false) {
            return commitsResult;
        }
        let count = countResult.count;
        if (countResult.status == false) {
            count = commitsResult.commits.length;
        }
        const paginationInfo = this.paginationService.paginationCalculation(
            count, limit, page);
        paginationInfo['list'] = commitsResult.commits;
        return paginationInfo;
    }

}
