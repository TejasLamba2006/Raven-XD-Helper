import { Listener } from "@sapphire/framework";
import {
  ActionRowBuilder,
  ActivityType,
  ButtonBuilder,
  ButtonStyle,
  Embed,
  EmbedBuilder,
  type Client,
  type TextChannel,
} from "discord.js";
import { exec } from "child_process";
import { config } from "../export";
export class ReadyListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options
  ) {
    super(context, {
      ...options,
      event: "ready",
    });
  }
  public run(client: Client) {
    if (client === null) return;
    const { username, id } = client.user!;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    (
      client.channels.cache.get(config.GITHUB_LOGS_CHANNEL_ID) as TextChannel
    ).send(
      "**[AUTOMATIC]** \nBot has been Successfully **Deployed** and **Ready**"
    );
    try {
      setInterval(() => {
        let error_log = "";
        exec(`git pull`, (error, stdout) => {
          let response = String(error || stdout);
          if (!error) {
            if (response.includes("Already up to date.")) {
              return;
            } else {
              (
                client.channels.cache.get(
                  config.GITHUB_LOGS_CHANNEL_ID
                ) as TextChannel
              ).send(
                "**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```" +
                  response +
                  "```" +
                  "\n\n\n**Restarting bot**"
              );
              setTimeout(() => {
                process.exit();
              }, 1000);
            }
          } else {
            if (error_log === response) return;
            (
              client.channels.cache.get(
                config.GITHUB_LOGS_CHANNEL_ID
              ) as TextChannel
            ).send(
              "**[AUTOMATIC]** \nError while pulling from GitHub. \n\nLogs: \n```" +
                response +
                "```"
            );
            error_log = response;
          }
        });
      }, 30000);
    } catch (e) {
      client.logger.error(e);
    }
    setInterval(() => {
      try {
        client.user?.setActivity(
          `${client.users.cache.size} hackers in Raven XD`,
          {
            type: ActivityType.Watching,
          }
        );
      } catch (e) {
        client.logger.error(e);
      }
    }, 15 * 1000);
    try {
      const reviewChannel = client.channels.cache.get(
        config.REVIEW_CHANNEL_ID
      ) as TextChannel;
      if (!reviewChannel) {
        return;
      }
      reviewChannel.messages.fetch().then((messages) => {
        if (
          messages.find(
            (m) =>
              m.author.id === client.user?.id &&
              m.embeds[0]?.footer?.text === "Review Footer: 1"
          )
        ) {
          return;
        } else {
          reviewChannel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle("Review")
                .setDescription(
                  "You can review the client by clicking the button below."
                )
                .setFooter({ text: "Review Footer: 1" })
                .setColor("Green"),
            ],
            components: [
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                  .setCustomId("review")
                  .setLabel("Review")
                  .setStyle(ButtonStyle.Primary)
              ),
            ],
          });
        }
      });
    } catch (e) {
      client.logger.error(e);
    }
  }
}
