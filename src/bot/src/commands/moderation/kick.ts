import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "kick",
    description: "Kick a user.",
    options: [
        {
            name: "user",
            description: "user to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason for the kick",
            type: "STRING"
        }
    ],
    defaultPermission: false,
    userPermissions: [
        "KICK_MEMBERS"
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        var reason = interaction.options.getString("reason");
        if (!user) { interaction.followUp({content:"Please provide a user to kick", ephemeral: true}); return;}

        var embed = new MessageEmbed()
            .setTitle("🔨 • kick")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`${user} has been kicked${reason ? ` for "${reason}"` : ""}.`);

        interaction.guild.members.kick(user.id)
        .catch((e : any) => {
            embed.setDescription(`${user} could not be kicked.`);
            embed.setColor("#F44336");
            return;
        })

        interaction.followUp({embeds: [embed]});
    }
});