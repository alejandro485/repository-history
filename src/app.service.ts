import { Injectable } from '@nestjs/common';
import { GetBranchesService } from './get-branches/get-branches.service';

@Injectable()
export class AppService {

    constructor(
        private getBranchesService: GetBranchesService,
    ) { }

    getRepository() {
        return {
            repository_name: process.env.FULLNAME_PATH,
        };
    }

    getBranches() {
        return this.getBranchesService.getBranches();
    }

}
