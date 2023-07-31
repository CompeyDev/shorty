import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client } from "../..";
import { userStore } from "../../../lib/libUser";

export default new Command({
  name: "level",
  description: "Fetch a user's level",
  options: [
    {
      name: "user",
      description: "user to fetch levels for",
      type: "USER",
    },
  ],
  run: async ({ interaction }) => {
    const user = interaction.options.getUser("user");
    var embed = new MessageEmbed()
      .setTitle(`📈 • Level`)
      .setColor("#2F3136")
      .setFooter({
        text:
          "Requested by " +
          interaction.user.username +
          "#" +
          interaction.user.discriminator,
        iconURL: interaction.user.avatarURL(),
      })
      .setTimestamp();
    if (user) {
      try {
        const store = new userStore(BigInt(user.id));
        const level = (await store.get(BigInt(user.id)))[0].level;

        embed.setDescription(`<@${user.id}> is currently Level ${level}`);
      } catch (e) {
        embed.setDescription("No level found.");
      }
    } else if (!user) {
      try {
        const store = new userStore(BigInt(interaction.user.id));
        const level = (await store.get(BigInt(interaction.user.id)))[0].level;
        var embed = new MessageEmbed()
          .setTitle(`📈 • Level`)
          .setColor("#2F3136")
          .setFooter({
            text:
              "Requested by " +
              interaction.user.username +
              "#" +
              interaction.user.discriminator,
            iconURL: interaction.user.avatarURL(),
          })
          .setTimestamp();

        embed.setDescription(
          `<@${interaction.user.id}> is currently Level ${level}`
        );
      } catch (e) {
        embed.setDescription("No level found.")
      }
    }

    interaction.followUp({ embeds: [embed] });
  },
});
