import { Command } from "../../structures/Command";
import { MessageEmbed, Permissions } from "discord.js";
import * as fs from "fs";


export default new Command({
    name: "warnings",
    description: "Lists warnings from a user.",
    // get a user from the argument
    options: [
        {
            name: "user",
            description: "user to get warnings info",
            type: "USER",
            required: true
        },
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        if (!user) { interaction.followUp({content:"Please provide a user to get warnings info from.", ephemeral: true}); return;}

        var infractionsJSON = JSON.parse(fs.readFileSync("src/commands/moderation/infractions.json").toString());
        const embed = new MessageEmbed()
            .setTitle("🔨 • Warnings of " + user.username + "#" + user.discriminator)
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`${user} has been warned ${infractionsJSON.find(x => x.id == user.id)?.warning_reasons || 0} ${infractionsJSON.find(x => x.id == user.id)?.warning_reasons == 1 ? "time" : "times"}.`);
        for (var i = 0; i < infractionsJSON.length; i++) {
            if (infractionsJSON[i]["id"] == parseInt(user.id)) {
                if (infractionsJSON[i]["reasons"]) {
                    for (var j = 0; j < infractionsJSON[i]["reasons"].length; j++) {
                        embed.addField(`Reason ${j + 1}`, infractionsJSON[i]["reasons"][j], true);
                    }
                }
                interaction.followUp({
                    embeds: [embed],
                });
                return;
            }
        }

        interaction.followUp({embeds: [embed]});
    }
});
