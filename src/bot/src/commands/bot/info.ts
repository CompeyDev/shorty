import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client, reply, replyAlone, replyEnd } from "../..";

export default new Command({
    name: "info",
    description: "Show information about the bot",
    run: async ({ interaction }) => {
        
        var embed = new MessageEmbed()
            .setTitle("🤖 • Info")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")

        embed
            .addField("Developers", `${replyAlone} <@893762371770802227>`)
            .addField("Cached Data", 
                `${reply} Guilds: ${interaction.client.guilds.cache.size.toString()}
                ${replyEnd} Users: ${interaction.client.users.cache.size.toString()}
                `
            )
            .addField("Versions",
                `${reply} Node: ${process.version}
                ${reply} Discord.js: ${require("discord.js").version}
                ${reply} Typescript: ${require("typescript").version}
                ${replyEnd} Version: ${require("../../../package.json").version}
                `
            )

            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

        embed
            .addField("Bot Info",
                `${reply} Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds
                ${reply} Platform: ${process.platform}
                ${replyEnd} Ping: ${Math.round(interaction.client.ws.ping)}ms
                `
            )

            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                    .setURL("https://datalink.dev/")
                    .setLabel("Website")
                    .setStyle('LINK'),
                new MessageButton()
                    .setURL("https://docs.datalink.dev")
                    .setLabel("Learn more")
                    .setStyle('LINK'),
			);
            interaction.followUp({embeds: [embed], components: [row] });
    }
});