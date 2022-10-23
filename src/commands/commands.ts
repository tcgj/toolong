import { CommandHandler } from './command-handler';

export class Commands implements CommandHandler {
  private commandMap = new Map<string, CommandHandler>();

  constructor(private fallbackHandler?: CommandHandler) {}

  async search(tokens: string[]): Promise<Response> {
    const handler = this.get(tokens[0]);

    if (!handler) {
      if (this.fallbackHandler) {
        return this.fallbackHandler.search(tokens);
      } else {
        throw new Error("No handler found for this command. Please contact TooLong's developer for support.");
      }
    }

    return handler.search(tokens.slice(1)).catch((error) => {
      if (this.fallbackHandler) {
        return this.fallbackHandler.search(tokens);
      }
      throw error;
    });
  }

  get(commandString: string): CommandHandler | undefined {
    return this.commandMap.get(commandString);
  }

  add(commandString: string, handler: CommandHandler): Commands {
    this.commandMap.set(commandString, handler);
    return this;
  }

  setFallback(handler: CommandHandler): Commands {
    this.fallbackHandler = handler;
    return this;
  }
}
