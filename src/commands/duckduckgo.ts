import { Utils } from '../util';
import { CommandHandler } from './command-handler';

export const DUCK_DUCK_GO_COMMAND_NAME = 'd';

export const duckDuckGoCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchUrl = Utils.makeSimpleSearchUrl('https://www.duckduckgo.com', 'q', tokens);
    return Utils.makeRedirectResponse(searchUrl);
  },
};
