import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client, reply, replyAlone, replyEnd } from "../..";

export default new Command({
    name: "color",
    description: "Set your color :)",
    options: [{
        name: "color",
        type: "STRING",
        description: "The color to get the role of.",
        required: true
    }],
    run: async ({ interaction }) => {


        var embed = new MessageEmbed()
            .setTitle("🌈 • Roles")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136");


        try {
            let role = interaction.guild.roles.cache.find(r => r.name === interaction.options.getString("color"))
            client.guilds.cache.get(interaction.GUILD_ID).members.cache.get(interaction.user.id).roles.add(role);
            var successEmbed = embed
                .addField("👍 Success", `${replyEnd} <@${interaction.user.id}> was assigned the color <@&${role.id}>!`)
            interaction.followUp({ embeds: [successEmbed] });
        } catch (e) {
            let role = interaction.guild.roles.cache.find(r => r.name === interaction.options.getString("color"))
            var failEmbed = embed
                .addField("👎 Failed", `${replyEnd} Failed to assign <@&${role.name}> to <@${interaction.user.username}>.`)
            interaction.followUp({ embeds: [failEmbed] })
        }

    }
});