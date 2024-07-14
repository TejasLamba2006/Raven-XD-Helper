import { Listener } from "@sapphire/framework";
import { EmbedBuilder, type Message } from "discord.js";
import { autoResponses } from "..";
import { request } from "undici";
import keycode from "keycode";
interface Module {
  name: string;
  prettyName: string;
  enabled: boolean;
  hidden: boolean;
  keybind: number | string;
  [key: string]: string | number | boolean;
}

interface Profile {
  bName: string;
  keybind: number;
  modules: Module[];
}

export class MessageCreateListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options
  ) {
    super(context, {
      ...options,
      event: "messageCreate",
    });
  }
  public async run(message: Message<true>) {
    if (message.author?.bot) {
      return;
    }
    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      console.log(attachment?.contentType);
      if (attachment?.contentType === "application/json; charset=utf-8") {
        const data = await request(attachment.url);
        const json = (await data.body.json()) as Profile;
        if (json) {
          const reply = await message.reply({
            content: "Received a Raven XD profile, processing...",
          });
          await message.react("👍");
          const enabled = json.modules.filter((module) => module.enabled);
          const keybinds = json.modules.filter(
            (module) => module.keybind !== 0
          );
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

          enabled.forEach((module) => {
            const moduleInfo = Object.entries(module)
              .map(([key, value]) => {
                if (typeof value === "boolean") {
                  value = value ? "Yes" : "No";
                }
                if (key === "keybind") {
                  if (typeof value === "string" && value.startsWith("M")) {
                    value = parseInt(value.split("M")[1]) + 1000;
                  }
                  value = keycode(value as number);
                }
                if (key === "prettyName") {
                  return;
                }
                return `${key}: \`${value}\``;
              })
              .filter(Boolean)
              .join("\n");

            addToField(enabledModulesFields, moduleInfo + "\n");
          });

          keybinds?.forEach((module) => {
            const moduleInfo = Object.entries(module)
              .map(([key, value]) => {
                if (key === "keybind") {
                  if (typeof value === "string" && value.startsWith("M")) {
                    value = parseInt(value.split("M")[1]) + 1000;
                  }
                  value = keycode(value as number);
                  return `${key}: \`${value}\``;
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
                index === 0 ? "🟢Enabled Module" : "🟢Enabled Module (cont.)",
              value: fieldValue || "None",
              inline: true,
            });
          });

          keybindsFields.forEach((fieldValue, index) => {
            embed.addFields({
              name: index === 0 ? "🔑Keybind" : "🔑Keybind (cont.)",
              value: fieldValue || "None",
              inline: true,
            });
          });
          await reply.edit({ embeds: [embed], content: "" });
        }
      }
    }
    const prefix = (await this.container.client.fetchPrefix(message)) || "!";
    if (message.content.startsWith(prefix?.toString())) {
      return;
    }
    await message.fetch();
    const autoResponse = autoResponses.find((autoResponse) =>
      autoResponse.keyphrases.some((keyphrase) =>
        message.content.toLowerCase().includes(keyphrase.toLowerCase())
      )
    );
    if (!autoResponse) {
      return;
    }
    if (autoResponse.reply) {
      if (message.reference && message.reference.messageId) {
        const referencedMessage = await message.channel.messages.fetch(
          message.reference.messageId
        );
        referencedMessage.reply({
          content: autoResponse.content,
          allowedMentions: autoResponse.mention
            ? { repliedUser: true }
            : { parse: [] },
        });
        return;
      }
      message.reply({
        content: autoResponse.content,
        allowedMentions: autoResponse.mention
          ? { repliedUser: true }
          : { parse: [] },
      });
    } else {
      message.channel.send({
        content: autoResponse.content,
        allowedMentions: autoResponse.mention
          ? { repliedUser: true }
          : { parse: [] },
      });
    }
  }
}
