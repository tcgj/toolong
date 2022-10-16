export interface CommandHandler {
  search: (tokens: string[]) => Promise<Response>;
}
