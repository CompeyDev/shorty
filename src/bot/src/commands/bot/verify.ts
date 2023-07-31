import { Command } from "../../structures/Command";
import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  TextChannel,
} from "discord.js";
import { client } from "../..";
import { delay } from "lodash";


export default new Command({
  name: "sendverify",
  description: "Send verification embed (FOR ADMINS ONLY).",
  defaultPermission: false,
  userPermissions: ["MANAGE_GUILD"],
  run: async ({ interaction }) => {
    const embed = new MessageEmbed()
      .addField(
        "Verification Required",
        "To gain access to `datalink` you need to prove you are a human by completing verification. Click the button below to get started!"
      )
      .setThumbnail(
        interaction.guild.iconURL({ size: 512 })
      );

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("verification-row")
        .setLabel("Verify")
        .setStyle("PRIMARY")
    );

    interaction.followUp({ content: "Sending embed..." });

    interaction.channel.sendTyping();

    delay(() => {}, 30000);

    (
      interaction.guild.channels.cache.get("1006430806887125082") as TextChannel
    ).send({ embeds: [embed], components: [row] });
    try {
      client.on("interactionCreate", (interaction) => {
        if (!interaction.isButton()) return;
        if (interaction.customId == "verification-row") {
          // interaction.deferReply();
          const verified =
            interaction.guild.roles.cache.get("933573711112597556");

          row.components[0].disabled = true;

          interaction.guild.members.cache
            .get(interaction.user.id)
            .roles.add(verified);

          interaction.reply({
            content: `Sucessfully verified!`,
            ephemeral: true,
          });

          row.components[0].disabled = false;
        }
      });
    } catch (e) {}
  },
});
