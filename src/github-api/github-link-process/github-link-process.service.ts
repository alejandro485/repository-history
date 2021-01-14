import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubLinkProcessService {

    private static DELIM_LINKS = ',';
    private static DELIM_LINK_PARAM = ';';

    githubLinkProcess(linkHeader: string) {
        const resources: {
            url: string,
            params: any,
            rel: string,
        }[] = [];
        const links = linkHeader.split(GithubLinkProcessService.DELIM_LINKS);
        for(const link of links) {
            const linkParams = link.split(GithubLinkProcessService.DELIM_LINK_PARAM);
            if (linkParams.length < 2) {
                continue;
            }
            const urlPart = linkParams[0].trim();
            if (!urlPart.startsWith("<") || !urlPart.endsWith(">")) {
                continue;
            }
            const urlResource = urlPart.substring(1, urlPart.length- 1);
            const urlParts = urlResource.split('?');
            let params = { };
            if (urlParts.length > 1) {
                params = JSON.parse('{"' + decodeURI(urlParts[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            }
            let relValue = '';
            for (let i = 1; i<linkParams.length; i++) {
                const rel = linkParams[i].trim().split('=');
                if (rel[0] != 'rel') {
                    continue;
                }
                relValue = rel[1];
                if (relValue.startsWith("\"") && relValue.endsWith("\"")) {
                    relValue = relValue.substring(1, relValue.length - 1);
                }
            }

            resources.push({
                url: urlResource,
                params,
                rel: relValue,
            });
        }
        return resources;
    }

}
