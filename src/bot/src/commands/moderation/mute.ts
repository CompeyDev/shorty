import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import { toNumber } from "lodash"

export default new Command({
    name: "mute",
    description: "mute a user",
    options: [
        {
            name: "user",
            description: "user to mute",
            type: "USER",
            required: true
        },
        {
            name: "time",
            description: "time for the mute",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "reason for the mute",
            type: "STRING"
        }
    ],
    defaultPermission: false,
    userPermissions: [
        "ADMINISTRATOR"
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        var time = interaction.options.getString("time");
        var reason = interaction.options.getString("reason");
        var userfetched = await interaction.guild.members.fetch(user.id);
        if (!user) { interaction.followUp({ content: "Please provide a user to mute", ephemeral: true }); return; }
        if (!time.endsWith('h')) {
            return;
        }

        var embed = new MessageEmbed()
            .setTitle("🔨 • Mute")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`${user} has been muted${reason ? ` for "${reason}" and time ${time}` : ""}.`);

        var timeconverted = time.replace('h', '');
        userfetched.timeout(toNumber(timeconverted) * 3600000, reason)
            .catch((e: any) => {
                embed.setDescription(`${user} could not be muted.`);
                embed.setColor("#F44336");
                return;
            })


        interaction.followUp({ embeds: [embed] });
    }
});