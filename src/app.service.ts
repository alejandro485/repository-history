import { Injectable } from '@nestjs/common';
import { GetBranchesService } from './get-branches/get-branches.service';
import { GetCommitsService } from './get-commits/get-commits.service';

@Injectable()
export class AppService {

    constructor(
        private getBranchesService: GetBranchesService,
        private getCommitsService: GetCommitsService,
    ) { }

    getRepository() {
        return {
            repository_name: process.env.FULLNAME_PATH,
        };
    }

    getBranches() {
        return this.getBranchesService.getBranches();
    }

    getCommits(query) {
        return this.getCommitsService.getCommits(query || { });
    }

}
