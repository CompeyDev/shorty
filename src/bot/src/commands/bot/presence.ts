import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import { client } from "../..";
import { presenceStore } from "../../../lib/libPresence"; 

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

            const store = new presenceStore();

        if (type == 'PLAYING') {
            await store.update(presence, "PLAYING");
            client.user?.setActivity(`${presence}`, { type: 'PLAYING' });
        } else if (type == 'LISTENING') {
            await store.update(presence, "LISTENING");
            client.user?.setActivity(`${presence}`, { type: 'LISTENING' });
        } else if (type == 'STREAMING') {
            await store.update(presence, "STREAMING");
            client.user?.setActivity(`${presence}`, { type: 'STREAMING' });
        } else if (type == 'WATCHING') {
            await store.update(presence, "WATCHING");
            client.user?.setActivity(`${presence}`, { type: 'WATCHING' });
        } else if (type == 'COMPETING') {
            await store.update(presence, "COMPETING");
            client.user?.setActivity(`${presence}`, { type: 'COMPETING' });
        } else {
            interaction.followUp({ content: "Please provide a valid type of status to set", ephemeral: true }); return;
        }

        interaction.followUp({ embeds: [embed] });
    }
});
