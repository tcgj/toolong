# TooLong

A redirect-based search engine that provides useful shortcuts to sites.

TooLong is powered by a service worker, which intercepts queries to the TooLong site and processes any commands, redirecting you to the most relevant site that you need.

## Usage

### Setup

To set up, add this link as a search engine in your favourite browser. To make it more convenient, set TooLong as your default search engine.

```
https://tcgj.github.io/toolong?search=%s
```

### Fallback

When performing a standard search, TooLong defaults to DuckDuckGo. To change this, include an additional `fallback` query parameter in the link. The specified search engine will be set as the default fallback search engine.

e.g.

```
https://tcgj.github.io/toolong?fallback=google&search=%s
```

Available fallback options:

```
- google
- duckduckgo
```

> **Warning**
> A fallback that is set will remain even if the parameter is removed. To reset to DuckDuckGo, explicitly set a fallback to `duckduckgo` instead.

### Commands

The list of commands available can be found on https://tcgj.github.io/toolong.

### Search away!

Using your search bar, type in any query or command, and watch TooLong do its magic!

## Development

### Running locally

```bash
yarn develop

```

TooLong will be served at `http://localhost:9000?search=%s`.

### Building TooLong

If you want to build TooLong on your own, run:

```bash
yarn install && yarn build
```

Then serve the generated `dist/` folder on your server. The search engine will be located at:

```
<<Your server origin>>?search=%s
```

For example:

```
https://www.myportfolio.com?search=%s
```

## Credits

- @taneliang for introducing bunnylol and his personal implementation `neh.eltan.net`
- Meta for creating bunnylol
