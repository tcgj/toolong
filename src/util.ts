export namespace Utils {
  export function tokenize(value: string, delimiter: string = ' '): string[] {
    return value.split(delimiter).filter((s) => s);
  }

  export function tokensToSearchString(tokens: string[], delimiter: string = ' '): string {
    return encodeURIComponent(tokens.join(delimiter));
  }

  export function makeSearchUrl(endpoint: string, searchParams: Record<string, string>): string {
    const queryPairs = Object.entries(searchParams);
    if (!queryPairs.length) {
      return endpoint;
    }
    return `${endpoint}${`?${queryPairs.map(([key, value]) => `${key}=${value}`).join('&')}`}`;
  }

  export function makeSimpleSearchUrl(endpoint: string, searchKey: string, tokens: string[]): string {
    return makeSearchUrl(endpoint, { [searchKey]: tokensToSearchString(tokens) });
  }

  export function makeRedirectResponse(url: string): Response {
    return Response.redirect(url, 302);
  }
}
