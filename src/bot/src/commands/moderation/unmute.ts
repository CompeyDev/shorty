import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "unmute",
    description: "unmute a user",
    options: [
        {
            name: "user",
            description: "user to unmute",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason for the unmute",
            type: "STRING"
        }
    ],
    defaultPermission: false,
    userPermissions: [
        "ADMINISTRATOR"
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        var reason = interaction.options.getString("reason");
        var userfetched = await interaction.guild.members.fetch(user.id);
        if (!user) { interaction.followUp({ content: "Please provide a user to unmute", ephemeral: true }); return; }

        var embed = new MessageEmbed()
            .setTitle("🔨 • Unmute")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`${user} has been unmuted ${reason ? ` for "${reason}"` : ""}.`);

        userfetched.timeout(0, 'On behalf of ' + interaction.user.username + '#' + interaction.user.discriminator)
            .catch((e: any) => {
                embed.setDescription(`${user} could not be unmuted.`);
                embed.setColor("#F44336");
                return;
            })


        interaction.followUp({ embeds: [embed] });
    }
});