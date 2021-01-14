import axios from 'axios';

export const githubRequest = axios.create({
    baseURL: process.env.GITHUB_API,
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
});
