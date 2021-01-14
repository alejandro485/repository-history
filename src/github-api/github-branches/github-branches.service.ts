import { Injectable } from '@nestjs/common';
import { githubRequest } from '../github.request';

@Injectable()
export class GithubBranchesService {

    public async getBranches(owner: string, repository: string, query?: any) {
        return this.getBranchesByFullname(owner + '/' + repository, query);
    }

    public async getBranchesByFullname(fullName: string, query?: any) {
        try {
            const queryString = Object.keys(query || {}).map(key => key + '=' + query[key]).join('&') + '';
            const result = await githubRequest.get('repos/' + fullName + '/branches?' + queryString);
            const branches = result.data.map(branch => {
                return {
                    name: branch.name,
                };
            });
            return {
                status: true,
                branches,
            };
        } catch (err) {
            return {
                status: false,
                error: err.toString(),
                message: 'No se leyeron las ramas del repositorio',
            }
        }
    }

}
