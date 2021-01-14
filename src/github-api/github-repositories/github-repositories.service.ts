import { Injectable } from '@nestjs/common';
import { githubRequest } from '../github.request';

@Injectable()
export class GithubRepositoriesService {

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

}
