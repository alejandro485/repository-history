import { Injectable } from '@nestjs/common';
import { githubRequest } from '../github.request';

@Injectable()
export class GithubCommitsService {

    public async getCommits(owner: string, repository: string, query?: any) {
        return this.getCommitsByFullname(owner + '/' + repository, query);
    }

    public async getCommitsByFullname(fullName: string, query?: any) {
        try {
            const queryString = Object.keys(query || {}).map(key => key + '=' + query[key]).join('&') + '';
            const result = await githubRequest.get('repos/' + fullName + '/commits?' + queryString);
            const commits = result.data.map(commitItem => {
                return {
                    sha: commitItem.sha,
                    message: commitItem.commit.message,
                    author: commitItem.commit.author,
                };
            });
            return {
                status: true,
                commits,
            };
        } catch (err) {
            return {
                status: false,
                error: err.toString(),
                message: 'No se leyeron los commits del repositorio',
            }
        }
    }

}
