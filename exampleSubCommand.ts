import { i18next } from "@sapphire/plugin-i18next";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { type ChatInputCommandInteraction } from "discord.js";

export class TicketsCommand extends Subcommand {
  constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: ".",
      subcommands: [
        {
          name: ".",
          chatInputRun: "anything",
        },
      ],
    });
  }
  public registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand(
      (command) =>
        command.setName(".").setDescription(".").setDMPermission(false),
      {
        idHints: [],
      }
    );
  }
  public async anything(interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;
  }
}
