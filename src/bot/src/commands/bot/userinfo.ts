import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client } from "../..";

export default new Command({
    name: "userinfo",
    description: "Show information about a user",
    options: [
        {
            name: "user",
            description: "The user to show information about",
            type: "USER",
            required: true
        }
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        var embed = new MessageEmbed()
            .setTitle(`🧑 • ${user.username}'s info`)
            .setThumbnail(user.avatarURL())
            .setColor("#2F3136")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp();
        
        var roles = client.guilds.cache.get(interaction.guild.id).members.cache.get(user.id).roles.cache
        embed
            .addField("Username", user.tag, true)
            .addField("Discriminator", user.discriminator, true)
            .addField("User ID", user.id, true)
            .addField("Mention", `<@${user.id}>`, true)
            .addField("Date Created", `<t:${Math.floor((new Date(user.createdAt.toUTCString())).getTime() / 1000)}:f>`, true)

            .addField("Date Joined", `<t:${Math.floor((new Date(client.guilds.cache.get(interaction.guild.id).members.cache.get(user.id).joinedAt.toUTCString())).getTime() / 1000)}:f>`, true)
            .addField("Roles", `${roles.size}`, true)
            .addField("Bot", user.bot ? "Yes" : "No", true)

        
        interaction.followUp({embeds: [embed]});
            
    }
});
    