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
  public run(message: Message) {
    if (message.author?.bot) {
      return;
    }
    const autoResponse = autoResponses.find((autoResponse) =>
      autoResponse.keyphrases.some((keyphrase) =>
        message.content.toLowerCase().includes(keyphrase.toLowerCase())
      )
    );
    if (!autoResponse) {
      return;
    }
    if (autoResponse.reply) {
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
