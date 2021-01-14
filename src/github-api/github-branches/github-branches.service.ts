import { Injectable } from '@nestjs/common';
import { githubRequest } from '../github.request';
import { GithubLinkProcessService } from '../github-link-process/github-link-process.service';

@Injectable()
export class GithubBranchesService {

    constructor(
        private githubLinkProcessService: GithubLinkProcessService,
    ) { }

    public async getBranches(owner: string, repository: string, query?: any) {
        return this.getBranchesByFullname(owner + '/' + repository, query);
    }

    public async getBranchesByFullname(fullName: string, query?: any) {
        try {
            const queryString = Object.keys(query || {}).map(key => key + '=' + query[key]).join('&') + '';
            const result = await githubRequest.get('repos/' + fullName + '/branches?' + queryString);
            console.log('result.headers: ', result.headers);
            const links = result.headers['Link'];
            console.log('links: ', links)
            const resources = this.githubLinkProcessService.githubLinkProcess(links);
            const branches = result.data.map(branch => {
                return {
                    name: branch.name,
                };
            });
            return {
                status: true,
                branches,
                resources,
            };
        } catch (err) {
            return {
                status: false,
                error: err.toString(),
                message: 'No se leyeron las ramas del repositorio',
            };
        }
    }

    public async countBranches(owner: string, repository: string) {
        return this.countBranchesByFullname(owner + '/' + repository);
    }

    public async countBranchesByFullname(fullName: string) {
        try {
            const result = await githubRequest.get('repos/' + fullName + '/branches?per_page=1');
            const links = result.headers['Link'];
            const resources = this.githubLinkProcessService.githubLinkProcess(links);
            const lastResource = resources.find(rc => rc.rel == 'last');
            return {
                status: true,
                count: parseInt(lastResource.params.page, 10),
            }
        } catch (err) {
            return {
                status: false,
                error: err.toString(),
                message: 'No se pudieron contar las ramas del repositorio',
            }
        }
    }

}
