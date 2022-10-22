export namespace Utils {
  export function tokenize(value: string): string[] {
    return value.split(' ').filter((s) => s);
  }

  export function tokensToSearchString(tokens: string[]): string {
    return encodeURIComponent(tokens.join(' '));
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
