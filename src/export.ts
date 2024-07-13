import { PermissionFlagsBits } from "discord.js";
import { z } from "zod";

export const config = z
  .object({
    TOKEN: z.string(),
    PREFIX: z.string(),
    GITHUB_LOGS_CHANNEL_ID: z.string(),
    REVIEW_CHANNEL_ID: z.string(),
  })
  .parse(process.env);

export const PERMISSIONS = [
  PermissionFlagsBits.ManageChannels,
  PermissionFlagsBits.ManageGuild,
  PermissionFlagsBits.ViewAuditLog,
  PermissionFlagsBits.CreateInstantInvite,
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseExternalEmojis,
];
