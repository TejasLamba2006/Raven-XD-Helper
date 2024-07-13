import "@sapphire/plugin-i18next/register";
import { LogLevel } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { config } from "./export.js";
import * as TOML from "@iarna/toml";
import { readFileSync } from "node:fs";
import { URL, fileURLToPath, pathToFileURL } from "node:url";
import Client from "./structures/client.js";
export type AutoResponse = {
  content: string;
  keyphrases: string[];
  mention: boolean;
  reply: boolean;
};
export const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  fetchPrefix: async () => {
    return config.PREFIX;
  },
  i18n: {
    fetchLanguage: async () => {
      return "en-US";
    },
  },
  loadMessageCommandListeners: true,
  logger: {
    level: LogLevel.Debug,
  },
});
const autoResponseData = readFileSync(
  fileURLToPath(new URL("../public/matching.toml", import.meta.url))
);
export const autoResponses: AutoResponse[] = [];
try {
  const parsedAutoResponses = TOML.parse(autoResponseData.toString());

  for (const [key, value] of Object.entries(parsedAutoResponses)) {
    const autoResponse = value as unknown as AutoResponse;
    client.logger.info(
      {
        autopresponse: { phrases: autoResponse.keyphrases },
      },
      `Registering autoresponse: ${key}`
    );
    autoResponses.push(autoResponse);
  }
} catch (error) {
  client.logger.error({ error }, "Failed to load autoresponses");
}

client.login(config.TOKEN);
