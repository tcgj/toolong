declare const self: ServiceWorkerGlobalScope;
export type {};

import { Commands } from './commands/commands';
import { dictionaryCommandHandler, DICTIONARY_COMMAND_NAME } from './commands/dictionary';
import { duckDuckGoCommandHandler, DUCK_DUCK_GO_COMMAND_NAME } from './commands/duckduckgo';
import { githubCommandHandler, GITHUB_COMMAND_NAME } from './commands/github';
import { googleCommandHandler, GOOGLE_COMMAND_NAME } from './commands/google';
import { stackOverflowCommandHandler, STACK_OVERFLOW_COMMAND_NAME } from './commands/stackoverflow';
import { youtubeCommandHandler, YOUTUBE_COMMAND_NAME } from './commands/youtube';
import { Utils } from './util';

const COMMANDS = new Commands(duckDuckGoCommandHandler)
  .add(DUCK_DUCK_GO_COMMAND_NAME, duckDuckGoCommandHandler)
  .add(GOOGLE_COMMAND_NAME, googleCommandHandler)
  .add(GITHUB_COMMAND_NAME, githubCommandHandler)
  .add(YOUTUBE_COMMAND_NAME, youtubeCommandHandler)
  .add(STACK_OVERFLOW_COMMAND_NAME, stackOverflowCommandHandler)
  .add(DICTIONARY_COMMAND_NAME, dictionaryCommandHandler);

async function getSearchResponse(searchString: string): Promise<Response> {
  const tokens = Utils.tokenize(searchString);

  return COMMANDS.search(tokens);
}

function setFallbackSearchHandler(altSearch: string) {
  switch (altSearch) {
    case 'google':
      COMMANDS.setFallback(googleCommandHandler);
      break;
    case 'duckduckgo':
      COMMANDS.setFallback(duckDuckGoCommandHandler);
      break;
    default:
      break;
  }
}

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients
      .claim()
      .then(() => {
        // See https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
        return self.clients.matchAll({ type: 'window' });
      })
      .then((clients) => {
        return clients.map((client) => {
          // Check to make sure WindowClient.navigate() is supported.
          if ('navigate' in client) {
            return client.navigate(client.url); // Immediately reload to perform search
          }
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Fix bug when opening link in new tab
  // https://stackoverflow.com/a/49719964
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  const url = new URL(event.request.url);
  const searchString = url.searchParams.get('search');
  if (searchString == null) {
    return;
  }

  const fallback = url.searchParams.get('fallback');
  if (fallback) {
    setFallbackSearchHandler(fallback);
  }

  event.respondWith(getSearchResponse(searchString));
});
