import { Injectable } from '@nestjs/common';
import { githubRequest } from '../github.request';
import { GithubLinkProcessService } from '../github-link-process/github-link-process.service';

@Injectable()
export class GithubRepositoriesService {

    constructor(
        private githubLinkProcessService: GithubLinkProcessService,
    ) { }

    public async getRepositoriesByUser(user: string, query?: any) {
        try {
            const queryString = Object.keys(query || {}).map(key => key + '=' + query[key]).join('&') + '';
            const result = await githubRequest.get('users/' + user + '/repos?' + queryString);
            const repositories = result.data.map(repo => {
                return {
                    id: repo.id,
                    node_id: repo.node_id,
                    name: repo.name,
                    full_name: repo.full_name,
                    owner_name: repo.owner.login,
                };
            });
            return {
                status: true,
                repositories,
            };
        } catch (err) {
            return {
                status: false,
                error: err.toString(),
                message: 'No se leyeron los repositorio',
            }
        }
    }

    public async countRepositoriesByUser(user: string) {
        try {
            const result = await githubRequest.get('users/' + user + '/repos?per_page=1');
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
                message: 'No se pudieron contar los commits del repositorio',
            }
        }
    }

}
