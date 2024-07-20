import { Command } from "@sapphire/framework";
import { EmbedBuilder, type Message } from "discord.js";
import { keyCodeMap, type Profile } from "../export";
import { request } from "undici";

export class PingCommand extends Command {
  constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "keybind",
      aliases: [],
      description: "See list of keybinds of a Raven XD profile",
    });
  }
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (command) =>
        command
          .setName("keybind")
          .setDescription("See list of keybinds of a Raven XD profile")
          .setDMPermission(false)
          .addAttachmentOption((option) =>
            option
              .setName("profile")
              .setDescription("The tag to show")
              .setRequired(true)
          ),

      {
        idHints: ["1254417214337974306"],
      }
    );
  }

  public async messageRun(message: Message) {
    const attachment = message.attachments.first();
    if (attachment?.contentType === "application/json; charset=utf-8") {
      const data = await request(attachment.url);
      const json = (await data.body.json()) as Profile;
      if (json) {
        const reply = await message.reply({
          content: "Received a Raven XD profile, processing...",
        });
        await message.react("👍");

        const keybinds = json.modules.filter((module) => module.keybind !== 0);

        const embed = new EmbedBuilder()
          .setTitle(attachment.name.split(".")[0])
          .setColor("Green");

        const MAX_FIELD_LENGTH = 1024;
        let enabledModulesFields = [""];
        let keybindsFields = [""];

        function addToField(fieldArray: string[], moduleInfo: string) {
          let currentFieldIndex = fieldArray.length - 1;
          if (
            fieldArray[currentFieldIndex].length + moduleInfo.length >
            MAX_FIELD_LENGTH
          ) {
            fieldArray.push(moduleInfo);
          } else {
            fieldArray[currentFieldIndex] += moduleInfo;
          }
        }

        keybinds?.forEach((module) => {
          const moduleInfo = Object.entries(module)
            .map(([key, value]) => {
              if (key === "keybind") {
                value = keyCodeMap[value as number];
                return `${module.prettyName}: \`${value}\``;
              }
            })
            .filter(Boolean)
            .join(", ");

          if (moduleInfo) {
            addToField(keybindsFields, moduleInfo + "\n");
          }
        });

        enabledModulesFields.forEach((fieldValue, index) => {
          embed.addFields({
            name:
              index === 0 ? "🟢 Enabled Modules" : "🟢 Enabled Modules (cont.)",
            value: fieldValue || "None",
            inline: true,
          });
        });

        keybindsFields.forEach((fieldValue, index) => {
          embed.addFields({
            name: index === 0 ? "🔑 Keybinds" : "🔑 Keybinds (cont.)",
            value: fieldValue || "None",
            inline: true,
          });
        });

        await reply.edit({ embeds: [embed], content: "" });
      }
    }
  }
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const attachment = interaction.options.getAttachment("profile");
    if (attachment?.contentType === "application/json; charset=utf-8") {
      const data = await request(attachment.url);
      const json = (await data.body.json()) as Profile;
      if (json) {
        const reply = await interaction.reply({
          content: "Received a Raven XD profile, processing...",
        });
        const keybinds = json.modules.filter((module) => module.keybind !== 0);

        const embed = new EmbedBuilder()
          .setTitle(attachment.name.split(".")[0])
          .setColor("Green");

        const MAX_FIELD_LENGTH = 1024;
        let enabledModulesFields = [""];
        let keybindsFields = [""];

        function addToField(fieldArray: string[], moduleInfo: string) {
          let currentFieldIndex = fieldArray.length - 1;
          if (
            fieldArray[currentFieldIndex].length + moduleInfo.length >
            MAX_FIELD_LENGTH
          ) {
            fieldArray.push(moduleInfo);
          } else {
            fieldArray[currentFieldIndex] += moduleInfo;
          }
        }

        keybinds?.forEach((module) => {
          const moduleInfo = Object.entries(module)
            .map(([key, value]) => {
              if (key === "keybind") {
                value = keyCodeMap[value as number];
                return `${module.prettyName}: \`${value}\``;
              }
            })
            .filter(Boolean)
            .join(", ");

          if (moduleInfo) {
            addToField(keybindsFields, moduleInfo + "\n");
          }
        });

        enabledModulesFields.forEach((fieldValue, index) => {
          embed.addFields({
            name:
              index === 0 ? "🟢 Enabled Modules" : "🟢 Enabled Modules (cont.)",
            value: fieldValue || "None",
            inline: true,
          });
        });

        keybindsFields.forEach((fieldValue, index) => {
          embed.addFields({
            name: index === 0 ? "🔑 Keybinds" : "🔑 Keybinds (cont.)",
            value: fieldValue || "None",
            inline: true,
          });
        });

        await reply.edit({ embeds: [embed], content: "" });
      }
    }
  }
}
