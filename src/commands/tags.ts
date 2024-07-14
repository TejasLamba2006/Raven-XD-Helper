import { Command } from "@sapphire/framework";
import { codeBlock, EmbedBuilder, type Message } from "discord.js";
import { autoResponses } from "..";

export class PingCommand extends Command {
  constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "tags",
      aliases: ["t"],
      description: "Shows the list of tags",
    });
  }
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (command) =>
        command
          .setName("tags")
          .setDescription("Shows the list of tags")
          .setDMPermission(false)
          .addStringOption((option) =>
            option
              .setName("tag")
              .setDescription("The tag to show")
              .setRequired(false)
          ),

      {
        idHints: ["1254417214337974306"],
      }
    );
  }

  public async messageRun(message: Message) {
    const autoResponse = autoResponses;
    if (message.content.split(" ")[1]) {
      const key = message.content.split(" ")[1];
      const response = autoResponse.get(key);
      if (!response) {
        message.reply("Tag not found");
        return;
      }
      message.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `**Tag:** ${key}\n**Content:** ${codeBlock(
              response.content
            )}\n**Keyphrases:** ${response.keyphrases
              .map((keyphrase) => `\`${keyphrase}\``)
              .join(", ")}\n **Mention:** ${response.mention}\n**Reply:** ${
              response.reply
            }`
          ),
        ],
      });
      return;
    }
    message.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          autoResponse.map((_autoResponse, key) => `\`${key}\``).join(", ")
        ),
      ],
    });
  }
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const autoResponse = autoResponses;
    const key = interaction.options.getString("tag");
    if (key) {
      const response = autoResponse.get(key);
      if (!response) {
        interaction.reply("Tag not found");
        return;
      }
      interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `**Tag:** ${key}\n**Content:** ${codeBlock(
              response.content
            )}\n**Keyphrases:** ${response.keyphrases
              .map((keyphrase) => `\`${keyphrase}\``)
              .join(", ")}\n **Mention:** ${response.mention}\n**Reply:** ${
              response.reply
            }`
          ),
        ],
      });
      return;
    }
    interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          autoResponse.map((_autoResponse, key) => `\`${key}\``).join(", ")
        ),
      ],
    });
  }
}
