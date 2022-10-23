import { Utils } from '../util';
import { CommandHandler } from './command-handler';
import { Commands } from './commands';

export const DICTIONARY_COMMAND_NAME = 'dict';

const dictionaryComCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchString = Utils.tokensToSearchString(tokens, '-');
    const searchUrl = `https://www.dictionary.com/browse/${searchString}`;
    return Utils.makeRedirectResponse(searchUrl);
  },
};

const baiduCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchUrl = Utils.makeSimpleSearchUrl('https://dict.baidu.com/s', 'wd', tokens);
    return Utils.makeRedirectResponse(searchUrl);
  },
};

const jishoCommandHandler: CommandHandler = {
  search: async (tokens) => {
    const searchString = Utils.tokensToSearchString(tokens);
    const searchUrl = `https://jisho.org/search/${searchString}`;
    return Utils.makeRedirectResponse(searchUrl);
  },
};

export const dictionaryCommandHandler = new Commands()
  .add('en', dictionaryComCommandHandler)
  .add('chn', baiduCommandHandler)
  .add('jp', jishoCommandHandler);
