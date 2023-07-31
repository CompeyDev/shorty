import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "ban",
    description: "Ban a user.",
    options: [
        {
            name: "user",
            description: "user to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason for the ban",
            type: "STRING"
        }
    ],
    defaultPermission: false,
    userPermissions: [
        "BAN_MEMBERS"
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        var reason = interaction.options.getString("reason");
        if (!user) { interaction.followUp({content:"Please provide a user to ban", ephemeral: true}); return;}

        var embed = new MessageEmbed()
            .setTitle("🔨 • Ban")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`${user} has been banned${reason ? ` for "${reason}"` : ""}.`);

        interaction.guild.members.ban(user.id, {reason: reason || null})
        .catch((e : any) => {
            embed.setDescription(`${user} could not be banned.`);
            embed.setColor("#F44336");
            return;
        })

        interaction.followUp({embeds: [embed]});
    }
});
