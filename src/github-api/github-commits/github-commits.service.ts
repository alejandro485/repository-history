import { Injectable } from '@nestjs/common';
import { githubRequest } from '../github.request';
import { GithubLinkProcessService } from '../github-link-process/github-link-process.service';

@Injectable()
export class GithubCommitsService {

    constructor(
        private githubLinkProcessService: GithubLinkProcessService,
    ) { }

    public async getCommits(owner: string, repository: string, query?: any) {
        return this.getCommitsByFullname(owner + '/' + repository, query);
    }

    public async getCommitsByFullname(fullName: string, query?: any) {
        try {
            const queryString = Object.keys(query || {}).map(key => key + '=' + query[key]).join('&') + '';
            const result = await githubRequest.get('repos/' + fullName + '/commits?' + queryString);
            const links = result.headers['Link'];
            const resources = this.githubLinkProcessService.githubLinkProcess(links);
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
                resources,
            };
        } catch (err) {
            return {
                status: false,
                error: err.toString(),
                message: 'No se leyeron los commits del repositorio',
            }
        }
    }

    public async countCommits(owner: string, repository: string) {
        return this.countCommitsByFullname(owner + '/' + repository);
    }

    public async countCommitsByFullname(fullName: string) {
        try {
            const result = await githubRequest.get('repos/' + fullName + '/commits?per_page=1');
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
