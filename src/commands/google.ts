import { Utils } from '../util';
import { CommandHandler } from './command-handler';

export const GOOGLE_COMMAND_NAME = 'gg';

export const googleCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchUrl = Utils.makeSimpleSearchUrl('https://www.google.com/search', 'q', tokens);
    return Utils.makeRedirectResponse(searchUrl);
  },
};
