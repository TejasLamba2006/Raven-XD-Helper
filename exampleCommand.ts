import { Command } from "@sapphire/framework";
import { i18next } from "@sapphire/plugin-i18next";

export class PingCommand extends Command {
  constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: ".",
    });
  }
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (command) => command.setName(".").setDescription("."),
      {
        idHints: [],
      }
    );
  }
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;
  }
}
