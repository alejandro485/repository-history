import { Injectable } from '@nestjs/common';
import { GithubBranchesService } from '../github-api/github-branches/github-branches.service';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class GetBranchesService {

    constructor(
        private githubBranchesService: GithubBranchesService,
        private paginationService: PaginationService,
    ) { }

    public async getBranches(query: any) {
        let page  = query.page;
        let limit = query.limit;
        const fullname = process.env.FULLNAME_PATH;
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit || limit < 1) {
            limit = 10;
        }

        const queryBranches = {
            page: page,
            per_page: limit,
        };
        const results = await Promise.all([
            this.githubBranchesService.countBranchesByFullname(fullname),
            this.githubBranchesService.getBranchesByFullname(fullname, queryBranches),
        ]);

        const countResult = results[0];
        const branchesResult = results[1];

        if (branchesResult.status == false) {
            return branchesResult;
        }
        let totalBranches = countResult.count;
        if (countResult.status == false) {
            totalBranches = branchesResult.branches.length;
        }
        const paginationInfo = this.paginationService.paginationCalculation(totalBranches, limit, page);
        paginationInfo['list'] = branchesResult.branches;
        return paginationInfo;
    }

}
