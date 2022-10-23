import { Utils } from '../util';
import { CommandHandler } from './command-handler';

export const STACK_OVERFLOW_COMMAND_NAME = 'so';

export const stackOverflowCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchUrl = Utils.makeSimpleSearchUrl('https://stackoverflow.com/search', 'q', tokens);
    return Utils.makeRedirectResponse(searchUrl);
  },
};
