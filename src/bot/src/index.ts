require("dotenv").config();
import { ExtendedClient } from "./structures/Client";

export const client = new ExtendedClient();
export const replyEnd = "<:icons_text1:875985515357282316>"
export const reply = "<:icons_text2:875985515701231677>"
export const replyAlone = "<:icons_text5:920259712728072252>"
client.start();


import { Event } from "./structures/Event";
export default new Event("ready", () => {
    console.log("Bot is online");
    client.user?.setActivity("with the bot", { type: "WATCHING" });
});


