import { Commands } from './commands';
import { Utils } from '../util';
import { CommandHandler } from './command-handler';

export const GITHUB_COMMAND_NAME = 'gh';

const GITHUB_BASE_URL = 'https://github.com/search';
const GITHUB_API_BASE_URL = 'https://api.github.com/search';

async function makeGithubSearchHandler(resource: string, tokens: string[]): Promise<Response> {
  const searchUrl = Utils.makeSearchUrl(`${GITHUB_API_BASE_URL}/${resource}`, 'q', tokens);
  const response = await fetch(searchUrl);
  if (!response.ok) {
    const body = await response.text();
    return new Response(`[${response.status} ${response.statusText}] GitHub API: ${body}`, { status: 500 });
  }

  const { items } = await response.json();
  if (items.length === 0) {
    return new Response(`No ${resource} found from GitHub for ${tokens.join(' ')}.`, { status: 404 });
  }

  return Utils.makeRedirectResponse(items[0].html_url);
}

const defaultSearchHandler: CommandHandler = {
  search: async (tokens) => {
    const searchUrl = Utils.makeSearchUrl(GITHUB_BASE_URL, 'q', tokens);
    return Utils.makeRedirectResponse(searchUrl);
  },
};

export const githubCommandHandler = new Commands(defaultSearchHandler)
  .add('r', { search: (tokens) => makeGithubSearchHandler('repositories', tokens) })
  .add('u', { search: (tokens) => makeGithubSearchHandler('users', tokens) });
