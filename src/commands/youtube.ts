import { Utils } from '../util';
import { CommandHandler } from './command-handler';

export const YOUTUBE_COMMAND_NAME = 'yt';

export const youtubeCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchUrl = Utils.makeSimpleSearchUrl('https://www.youtube.com/results', 'search_query', tokens);
    return Utils.makeRedirectResponse(searchUrl);
  },
};
