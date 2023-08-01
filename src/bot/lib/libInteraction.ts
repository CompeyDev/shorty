import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    Interaction,
    InteractionButtonOptions,
    MessageActionRow,
    MessageAttachment,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,
    Modal,
    ModalSubmitInteraction,
    SelectMenuInteraction,
    TextInputComponent
} from "discord.js";
import { ExtendedInteraction } from "../src/typings/Command";
import { client, reply, replyEnd } from "../src";
import { Command } from "../src/structures/Command";
import { delay, lastIndexOf } from "lodash";


async function handleChatCommand(interaction: CommandInteraction) {
    try {
        await interaction.deferReply();
    } catch (e) { }
    const command = client.commands.get(interaction.commandName);
    if (!command)
        return interaction.followUp("You have used a non existent command");

    command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction,
    });
}

function helpMenuHandler() {
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("cancelButton")
            .setLabel("Back")
            .setEmoji("<:icons_dleave:875754473023229972>")
            .setStyle("DANGER")
    );

    const commandMenu = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("Select command type")
            .addOptions([
                {
                    label: "General",
                    description: "General commands",
                    value: "general",
                },
                {
                    label: "Moderation",
                    description: "Commands to be used for moderation",
                    value: "moderation",
                },
            ])
    );

    return { row, commandMenu }
}
async function helpMenuManager(interaction: SelectMenuInteraction) {
    const commandMenu = helpMenuHandler().commandMenu
    const row = helpMenuHandler().row

    let cmds = new Map()
    let admin_cmds = new Map()

    let i = 0
    const admin_cmds_filtered = client.commands.filter(f => f.userPermissions?.includes("MANAGE_GUILD") || f.userPermissions?.includes("ADMINISTRATOR") || f.userPermissions?.includes("KICK_MEMBERS") || f.userPermissions?.includes("BAN_MEMBERS") || f.name.toLowerCase() === "eval")
    const cmds_filtered = client.commands.filter(f => !(f.userPermissions?.includes("MANAGE_GUILD") || f.userPermissions?.includes("ADMINISTRATOR") || f.userPermissions?.includes("KICK_MEMBERS") || f.userPermissions?.includes("BAN_MEMBERS") || f.name.toLowerCase() === "eval"))
    cmds_filtered.forEach(cmd => {
        console.log("sizes:", i, cmds_filtered.size)
        if (i + 1 == cmds_filtered.size) {
            cmds.set(i, `${replyEnd}${cmd.name} - ${cmd.description}`)
        } else {
            cmds.set(i, `${reply}${cmd.name} - ${cmd.description}`)
        }
        
        i++
    })

    i = 0

    admin_cmds_filtered.forEach(cmd => {
        if (i + 1 == admin_cmds_filtered.size) {
            admin_cmds.set(i, `${replyEnd}${cmd.name} - ${cmd.description}`)
        } else {
            admin_cmds.set(i, `${reply}${cmd.name} - ${cmd.description}`)
        }
             
        i++
    })


    console.log(`libInteraction :: Unpacked user commands data -> \n`, cmds)
    console.log(`libInteraction :: Unpacked admin commands data -> \n`, admin_cmds)

    let cmds_string: string = ""
    let admin_cmds_string: string = ""

    cmds.forEach((str) => {
        cmds_string += `${str}\n`
    })

    admin_cmds.forEach((str) => {
        admin_cmds_string += `${str}\n`
    })

    console.log(`libInteraction :: Constructed user commands string -> \n`, cmds_string)
    console.log(`libInteraction :: Constructed admin commands string -> \n`, admin_cmds_string)

    if (interaction.values[0] == "general") {
        try {
            // await interaction.deferReply();
            var embed = new MessageEmbed()
                .setTitle("❓ • Help")
                .setFooter({
                    text:
                        "Requested by " +
                        interaction.user.username +
                        "#" +
                        interaction.user.discriminator,
                    iconURL: interaction.user.avatarURL(),
                })
                .setTimestamp()
                .setColor("#2F3136");
            embed.addField("Available commands", cmds_string);
            await interaction.update({ embeds: [embed], components: [row] });

            const filter = (interaction) =>
                interaction.customId === "cancelButton";
            const collector = interaction.channel.createMessageComponentCollector(
                { filter, time: 15000 }
            );
            collector.on("collect", async (interaction) => {
                await interaction.update({ embeds: [], components: [commandMenu] });
                collector.stop();
            });
        } catch (err) { }
    }

    if (interaction.values[0] == "moderation") {
        try {
            // await interaction.deferReply();
            var embed = new MessageEmbed()
                .setTitle("❓ • Help")
                .setFooter({
                    text:
                        "Requested by " +
                        interaction.user.username +
                        "#" +
                        interaction.user.discriminator,
                    iconURL: interaction.user.avatarURL(),
                })
                .setTimestamp()
                .setColor("#2F3136");
            embed.addField("Available commands", admin_cmds_string);
            await interaction.update({ embeds: [embed], components: [row] });

            const filter = (interaction: any) =>
                interaction.customId === "cancelButton";
            const collector = interaction.channel.createMessageComponentCollector(
                { filter, time: 15000 }
            );
            collector.on("collect", async (interaction) => {
                await interaction.update({ embeds: [], components: [commandMenu] });
            });

            delay(() => {}, 300000)

            collector.stop();
        } catch (err) { }
    }
}

function evalHandler() {
    const modal = new Modal()
        .setCustomId('code-modal')
        .setTitle('Enter your code here');

    const codeInput = new TextInputComponent()
        .setCustomId('codeInput')
        .setLabel("woah real code")
        .setStyle('PARAGRAPH');

    const row1 = new MessageActionRow<TextInputComponent>().addComponents(codeInput);
    return modal.addComponents(row1);
}

function EvalManager(interaction: ModalSubmitInteraction) {


    if (interaction.customId === "code-modal") {
        try {
            const code = `${interaction.fields.getTextInputValue("codeInput")}`;
            if (code.includes(client.token) || code.includes("Client.token") || code.includes("client.token")) {
                console.log('Someone tried to get the token with eval.')
                interaction.reply({
                    content: "you really tried."
                })
                return;
            }
            if (!code) {
                interaction.followUp({
                    content: "give some code to evaluate bruh",
                });
            }
            let evaled = eval(code);




            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            if (evaled.includes(client.token) || evaled.includes("Client.token") || evaled.includes("client.token")) {
                console.log('Someone really tried to get the token with eval.')
                interaction.reply({
                    content: "you really tried."
                })
                return;
            }
            interaction.reply({ content: `\`\`\`fix\n${evaled}\`\`\`` });
            const output = new MessageAttachment(Buffer.from(evaled), "evaluated.js");
            if (evaled.length > 1900)
                return interaction.reply({ files: [output] });
        } catch (e) {
            console.log(e);
            interaction.reply({ content: e.message })
        }
    }

}

export async function interactionManager(interaction: Interaction) {
    if (interaction.isCommand()) {
        try {
            if (interaction.command.name == "eval") {
                // eval command edge case
                await interaction.showModal(evalHandler());
            } else {
                handleChatCommand(interaction);
            }
        } catch (e) { }
    }

    // handle eval modal

    if (interaction.user.id === process.env.OWNER_ID) {
        if (interaction.isModalSubmit()) {
            EvalManager(interaction)
        }
    }

    // handle help menu select

    if (interaction.isSelectMenu()) {
        if (interaction.customId === "select") {
            helpMenuManager(interaction)
        }
    }
}
