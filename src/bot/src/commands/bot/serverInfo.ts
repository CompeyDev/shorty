import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client } from "../..";

export default new Command({
    name: "serverinfo",
    description: "Show information about the server",
    run: async ({ interaction }) => {
        var embed = new MessageEmbed()
            .setTitle(`💻 • Server Info`)
            .setThumbnail(interaction.guild.iconURL())
            .setColor("#2F3136")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp();
        
        embed
            .addField("Server Name", interaction.guild.name, true)
            .addField("Server ID", interaction.guild.id, true)
            .addField("Server Owner", `<@${interaction.guild.ownerId}>`, true)
            .addField("Owner ID", interaction.guild.ownerId, true)
            .addField("Members", interaction.guild.memberCount.toString(), true)
            .addField("Channels", interaction.guild.channels.cache.size.toString(), true)
            .addField("Roles", interaction.guild.roles.cache.size.toString(), true)
            .addField("Emojis", interaction.guild.emojis.cache.size.toString(), true)
            .addField("Date Created", `<t:${Math.floor((new Date(interaction.guild.createdAt.toUTCString())).getTime() / 1000)}:f>`, true)
            .addField("Verification Level", (interaction.guild.verificationLevel.toString().replace("_", " ")).charAt(0).toUpperCase() + (interaction.guild.verificationLevel.toString().replace("_", " ")).substring(1).toLowerCase(), true)
            //.addField("Roles", interaction.guild.roles.cache.map(r => `<@${r.id}>`).join(", "), true)

        
        interaction.followUp({embeds: [embed]});
            
    }
});
    