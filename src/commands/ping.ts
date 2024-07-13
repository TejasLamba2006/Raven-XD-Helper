import { Command } from "@sapphire/framework";
import { i18next } from "@sapphire/plugin-i18next";
import type { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      aliases: ["p"],
      description: "Shows the latency of the bot.",
    });
  }
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (command) =>
        command
          .setName("ping")
          .setDescription("Shows the latency of the bot.")
          .setDMPermission(false),
      {
        idHints: ["1254417214337974306"],
      }
    );
  }

  public async messageRun(message: Message) {
    const time = Date.now();
    const msg = await message.reply({ content: "Pinging..." });

    const roundTripTime = Date.now() - time;
    const wsPing = this.container.client.ws.ping;

    return msg.edit(
      i18next.t("commands:ping", {
        roundTime: roundTripTime,
        ping: wsPing.toFixed(),
      })
    );
  }
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const time = Date.now();
    await interaction.reply({ content: "Pinging..." });

    const roundTripTime = Date.now() - time;
    const wsPing = this.container.client.ws.ping;

    return interaction.editReply(
      i18next.t("commands:ping", {
        roundTime: roundTripTime,
        ping: wsPing.toFixed(),
      })
    );
  }
}
