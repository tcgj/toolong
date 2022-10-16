export namespace Utils {
  export function tokenize(value: string): string[] {
    return value.split(' ').filter((s) => s);
  }

  export function makeSearchUrl(endpoint: string, queryParam: string, tokens: string[]): string {
    return `${endpoint}?${queryParam}=${encodeURIComponent(tokens.join(' '))}`;
  }

  export function makeRedirectResponse(url: string): Response {
    return Response.redirect(url, 302);
  }
}
