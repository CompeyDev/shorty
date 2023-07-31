import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import { client } from "../..";

export default new Command({
    name: "unban",
    description: "Unban a user.",
    options: [
        {
            name: "user",
            description: "user's id to unban",
            type: "STRING",
            required: true
        },
    ],
    defaultPermission: false,
    userPermissions: [
        "BAN_MEMBERS"
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getString("user");
        var userinfo = await client.users.fetch(user);
        if (!user || !userinfo) { interaction.followUp({content:"Please provide a user to unban", ephemeral: true}); return;}

        var embed = new MessageEmbed()
            .setTitle("🔨 • Unban")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`<@${userinfo.id}> has been unbanned.`);
        
        interaction.guild.members.unban(user.toString())
        .catch(() => {
            embed.setDescription(`${user} could not be unbanned.`);
            embed.setColor("#F44336");
        })

        interaction.followUp({embeds: [embed]});
    }
});