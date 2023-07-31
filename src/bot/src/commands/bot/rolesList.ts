import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client, reply, replyAlone, replyEnd } from "../..";

export default new Command({
    name: "colors",
    description: "Show available color roles",
    run: async ({ interaction }) => {


        var embed = new MessageEmbed()
            .setTitle("🌈 • Roles")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136");

            embed.setImage("https://images-ext-2.discordapp.net/external/Jq-utUfUqu30y6VtGbJkPOdYwSN_axPCCuQWKotO750/https/cdn.colorchan.com/colorLists/8e05fbce-926b-4cf8-8e64-4edc98e49e1b.png?width=1107&height=675")
            interaction.followUp({ embeds: [embed] })

    }
});