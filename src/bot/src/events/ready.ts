import { Event } from "../structures/Event";
import { writeFile, writeFileSync } from "fs";
import { client, reply, replyAlone, replyEnd } from ".."
import { setPresence } from "../../lib/libPresence";

export default new Event("ready", async () => {
    setPresence()

    console.log("Bot is online!");
});
