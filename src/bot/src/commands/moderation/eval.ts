import { Command } from "../../structures/Command";
import { MessageAttachment, MessageEmbed, MessageActionRow, Modal, TextInputComponent } from "discord.js";

export default new Command({
  name: "eval",
  description: "a minor bit of tomfoolery",
  run: async ({ interaction }) => {
    console.log("Eval Command Received")
  },
});
