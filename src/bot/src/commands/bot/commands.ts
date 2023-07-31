import { Command } from "../../structures/Command";
import { MessageSelectMenu, MessageEmbed, MessageActionRow, MessageButton, BitField, Permissions } from "discord.js";
import { client } from "../..";



export default new Command({
    name: "help",
    description: "Show the list of available commands",
    run: async ({ interaction }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'General',
                            description: 'General commands',
                            value: 'general',
                        },
                        {
                            label: 'Moderation',
                            description: 'Commands to be used for moderation',
                            value: 'moderation',
                        },
                    ]),
            );

        interaction.followUp({ components: [row] });

    }
});
