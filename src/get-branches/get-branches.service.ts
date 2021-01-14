import { Injectable } from '@nestjs/common';
import { GithubBranchesService } from '../github-api/github-branches/github-branches.service';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class GetBranchesService {

    constructor(
        private githubBranchesService: GithubBranchesService,
        private paginationService: PaginationService,
    ) { }

    public async getBranches() {
        const fullname = process.env.FULLNAME_PATH;
        const branchesResult = await this.githubBranchesService.getBranchesByFullname(fullname, { });
        if (branchesResult.status == false) {
            return branchesResult;
        }
        const paginationInfo = this.paginationService.paginationCalculation(
            branchesResult.branches.length, branchesResult.branches.length || 1, 1);
        paginationInfo['list'] = branchesResult.branches;
        return paginationInfo;
    }

}
