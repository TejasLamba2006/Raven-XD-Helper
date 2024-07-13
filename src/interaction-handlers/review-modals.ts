import {
  InteractionHandler,
  InteractionHandlerTypes,
} from "@sapphire/framework";
import {
  codeBlock,
  type ModalSubmitInteraction,
  type TextChannel,
} from "discord.js";
import { config } from "../export";

export class ModalHandler extends InteractionHandler {
  public constructor(
    ctx: InteractionHandler.LoaderContext,
    options: InteractionHandler.Options
  ) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.ModalSubmit,
    });
  }

  public override parse(interaction: ModalSubmitInteraction) {
    return this.some();
  }

  public async run(interaction: ModalSubmitInteraction) {
    await interaction.deferReply();
    const reviewId = interaction.customId.split("-")[1];
    const review = interaction.fields;
    const channelLogs = interaction.guild?.channels.cache.get(
      config.REVIEW_CHANNEL_LOGS_ID
    ) as TextChannel;
    if (!channelLogs) {
      return interaction.editReply({
        content: "Logs channel not found.",
      });
    }
    if (!reviewId) {
      return interaction.editReply({
        content: "Review ID not found.",
      });
    }
    if (!parseInt(review.getTextInputValue("rating"))) {
      return interaction.editReply({
        content: "Rating is not a number.",
      });
    }
    if (
      parseInt(review.getTextInputValue("rating")) < 1 ||
      parseInt(review.getTextInputValue("rating")) > 10
    ) {
      return interaction.editReply({
        content: "Rating should be between 1-10.",
      });
    }
    await channelLogs.send({
      content: `Review by <@${reviewId}> \n ${codeBlock(
        "js",
        JSON.stringify(
          `
            {
            "name": ${interaction.user.username},
            "country": ${review.getTextInputValue("country")},
            "designation": "Member",
            "time": ${new Date().toDateString()},
            "image": ${interaction.user.displayAvatarURL()},
            "review": {
                "rating": ${review.getTextInputValue("rating")},
                "tittle": ${review.getTextInputValue("title")},
                "description": ${review.getTextInputValue("description")}
            }
            `,
          null,
          2
        )
      )}`,
    });
    await interaction.editReply({
      content: "Review submitted successfully.",
    });
  }
}
