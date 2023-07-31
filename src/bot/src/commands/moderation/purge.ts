import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";

export default new Command({
  name: "purge",
  description: "bulk delete messages",
  options: [
    {
      name: "messages",
      description: "number of messages to delete",
      type: "STRING",
      required: true,
    },
  ],
  defaultPermission: false,
  userPermissions: ["MANAGE_GUILD"],
  run: async ({ interaction }) => {
    var messages = interaction.options.getString("messages");
    if (!messages) {
      interaction.followUp({
        content: "Please provide a user to kick",
        ephemeral: true,
      });
      return;
    }

    var embed = new MessageEmbed()
      .setTitle("🔨 • Purge")
      .setFooter({
        text:
          "Requested by " +
          interaction.user.username +
          "#" +
          interaction.user.discriminator,
        iconURL: interaction.user.avatarURL(),
      })
      .setTimestamp()
      .setColor("#2F3136")
      .setDescription(`${messages} have been deleted.`);

    let messagecount = parseInt(messages) + 1;
    interaction.channel
      .messages.fetch({ limit: messagecount })
      .then((messages) => interaction.channel.bulkDelete(messages)); 

    interaction.followUp({ embeds: [embed] });
  },
});
