import { Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
import { autoResponses } from "..";

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
