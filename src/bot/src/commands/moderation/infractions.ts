import {
    Command
} from "../../structures/Command";
import {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageAttachment
} from "discord.js";
import {
    client
} from "../..";
import * as fs from "fs";

export default new Command({
    name: "infractions",
    description: "View the infractions of a specified user.",
    options: [{
        name: "user",
        type: "USER",
        description: "The user to view infractions for.",
        required: true
    }],
    run: async ({
        interaction
    }) => {
        var user = interaction.options.getUser("user");
        var embed = new MessageEmbed()
            .setTitle(`🔨 • ${user.username}'s infractions`)
            .setColor("#2F3136")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp();

        var infractionsJSON = JSON.parse(fs.readFileSync("src/commands/moderation/infractions.json").toString());
        for (var i = 0; i < infractionsJSON.length; i++) {
            if (infractionsJSON[i]["id"] == user.id) {
                for (var n = 0; n < infractionsJSON[i]["reasons"].length; n++) {
                    embed
                        .addField(`Reason #${n + 1}`, infractionsJSON[i]["reasons"][n], true)
                }
            }

        }
        interaction.followUp({embeds: [embed]});
    }
});