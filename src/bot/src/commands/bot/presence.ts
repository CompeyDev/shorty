import { Command } from "../../structures/Command";
import { ExcludeEnum, MessageEmbed } from "discord.js";
import { client } from "../..";
import { ActivityTypes } from "discord.js/typings/enums";
import { setPresence } from "../../../lib/libPresence";
import { readFileSync } from "fs";

export default new Command({
    name: "presence",
    description: "Set the bot's presence.",
    options: [
        {
            name: "type",
            description: "type of presence",
            type: "STRING",
            required: true
        },
        {
            name: "presence",
            description: "text to set",
            type: "STRING",
            required: true
        },
    ],
    defaultPermission: false,
    userPermissions: [
        "ADMINISTRATOR"
    ],
    run: async ({ interaction }) => {
        var presence = interaction.options.getString("presence");
        var type = interaction.options.getString("type");

        var embed = new MessageEmbed()
            .setTitle("🟢 • Set Presence")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")
            .setDescription(`Presence has been set to ${type} ${presence}.`);

        // TODO: Check what working dir is
        readFileSync(".env").toString().replace(/PRESENCE_MESSAGE=.*/, `PRESENCE_MESSAGE=${type} ${presence}`)
        process.env.PRESENCE_MESSAGE = type + presence

        setPresence()

        interaction.followUp({ embeds: [embed] });
    }
});
