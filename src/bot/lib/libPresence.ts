import { ExcludeEnum } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import { client } from "../src";

export function setPresence() {
    const presenceMessage = process.env.PRESENCE_MESSAGE.split(" ")
    const presenceType = presenceMessage[0]

    client.user?.setActivity(presenceMessage.slice(1).toString().replace(",", " "), { type: presenceType as unknown as ExcludeEnum<typeof ActivityTypes, "CUSTOM"> });
}