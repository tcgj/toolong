import { CommandHandler } from './command-handler';

export class Commands {
  private commandMap = new Map<string, CommandHandler>();

  constructor(private fallbackHandler: CommandHandler) {}

  async search(tokens: string[]): Promise<Response> {
    const handler = this.get(tokens[0]);

    if (!handler) {
      return this.fallbackHandler.search(tokens);
    }

    return handler.search(tokens.slice(1));
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
