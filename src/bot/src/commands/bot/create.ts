import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client } from "../..";
import axios from "axios";

export default new Command({
    name: "create",
    description: "Create a shortlink",
    options: [
        {
            name: "url",
            description: "original URL to shorten",
            type: "STRING",
            required: true
        },
        {
            name: "vanity",
            description: "optional vanity address",
            type: "STRING",
            required: false
        },
    ],
    run: async ({ interaction }) => {
        var url = interaction.options.getString("url");
        var vanity = interaction.options.getString("vanity");

        var embed = new MessageEmbed()
            .setTitle(`💻 • Shortlink`)
            .setColor("#2F3136")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp();

        await axios.post("http://" + (process.env.DOMAIN_URI ?? "0.0.0.0") + ":" + (process.env.PORT ?? "12389") + "/api/create", {
            toUrl: url,
            vanity
        })
            .then((resp) => { embed.setDescription(`Shortlink successfully created! Accessible at http://${resp.data.url}`) })
            .catch(() => { embed.setDescription(`Failed to create shortlink.`) });




        interaction.followUp({ embeds: [embed] });

    }
});
