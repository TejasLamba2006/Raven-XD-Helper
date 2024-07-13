import {
  InteractionHandler,
  InteractionHandlerTypes,
} from "@sapphire/framework";
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ButtonInteraction,
  type ModalActionRowComponentBuilder,
} from "discord.js";

export class ButtonHandler extends InteractionHandler {
  public constructor(
    ctx: InteractionHandler.LoaderContext,
    options: InteractionHandler.Options
  ) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button,
    });
  }
  //   {
  //     "id": 1,
  //     "name": "Tejas Lamba",
  //     "country": "in",
  //     "designation": "Developer",
  //     "time": "Jul 08 2024 16:25:36",
  //     "image": "/discord.png",
  //     "review": {
  //         "rating": 8,
  //         "tittle": "Effective, efficient, discret and powerful.",
  //         "description": "If you are looking for an free effective cheat that will help you in all possible situations no matter what server you are playing on, Raven XD is the solution you are looking for. Raven XD has become the client of choice to test the AntiCheats of the servers I own, or to go and have fun with friends on community servers to make 12 year olds rage that show their moms that they love ButterFlyClick. Anyway, on many servers, even with settings set to the extreme, Raven XD knows how to be discreet, while having a clear advantage against the opponents encountered. In short, you need a powerful cheat? Take Raven XD."
  //     }
  // }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== "review") return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setTitle("Review")
      .setCustomId(`review-${interaction.user.id}`);

    modal.addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("rating")
          .setLabel("Rating")
          .setPlaceholder("Enter rating from 1-10")
          .setRequired(true)
          .setMaxLength(2)
          .setMinLength(1)
          .setStyle(TextInputStyle.Short)
      ),
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("country")
          .setLabel("Country")
          .setPlaceholder("Enter your country (Not required)")
          .setRequired(false)
          .setMaxLength(20)
          .setMinLength(1)
          .setStyle(TextInputStyle.Short)
      ),
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("title")
          .setLabel("Title")
          .setPlaceholder("Enter review title")
          .setRequired(true)
          .setMaxLength(100)
          .setMinLength(1)
          .setStyle(TextInputStyle.Paragraph)
      ),
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("description")
          .setLabel("Description")
          .setPlaceholder("Enter review description")
          .setRequired(true)
          .setMaxLength(2000)
          .setMinLength(1)
          .setStyle(TextInputStyle.Paragraph)
      )
    );
    await interaction.showModal(modal);
  }
}
