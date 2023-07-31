import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import * as fs from "fs";


export default new Command({
    name: "warn",
    description: "Warn a user.",
    // get a user from the argument
    options: [
        {
            name: "user",
            description: "user to warn",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason for the warnings",
            type: "STRING"
        }
    ],
    defaultPermission: false,
    userPermissions: [
        "KICK_MEMBERS"
    ],
    run: async ({ interaction }) => {
        var user = interaction.options.getUser("user");
        // make user required
        if (!user) { interaction.followUp({content:"Please provide a user to warn", ephemeral: true}); return;}
        var reason = interaction.options.getString("reason") || "No reason provided";

        var infractionsJSON = JSON.parse(fs.readFileSync("src/commands/moderation/infractions.json").toString());
        const embed = new MessageEmbed()
            .setTitle("🔨 • Warn")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`${user} has been warned${reason ? ` for "${reason}".` : "."}`);
        
        for (var i = 0; i < infractionsJSON.length; i++) {
            if (infractionsJSON[i]["id"] == parseInt(user.id)) {
                infractionsJSON[i]["warning_reasons"]++;
                if (!infractionsJSON[i]["reasons"]) {
                    infractionsJSON[i]["reasons"] = [];
                }
                infractionsJSON[i]["reasons"].push(reason);
                fs.writeFileSync("src/commands/moderation/infractions.json", JSON.stringify(infractionsJSON, null, 4));
                interaction.followUp({embeds: [embed], content: "<@" + user.id + ">"});
                return;
            }
        }

        var newInfraction = {
            "id": user.id,
            "warning_reasons": 1,
            "reasons": [reason]
        }
        infractionsJSON.push(newInfraction);
        fs.writeFileSync("src/commands/moderation/infractions.json", JSON.stringify(infractionsJSON, null, 4));

        interaction.followUp({embeds: [embed], content: "<@" + user.id + ">"});
    }
});
