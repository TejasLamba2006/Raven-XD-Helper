import { Listener } from "@sapphire/framework";
import { ActivityType, type Client, type TextChannel } from "discord.js";
import { exec } from "child_process";
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
      client.channels.cache.get(
        process.env.GITHUB_LOGS_CHANNEL_ID || ""
      ) as TextChannel
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
                  process.env.GITHUB_LOGS_CHANNEL_ID || ""
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
                process.env.GITHUB_LOGS_CHANNEL_ID || ""
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
  }
}
