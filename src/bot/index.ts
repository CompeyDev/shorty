import { SapphireClient } from "@sapphire/framework";

export default function main(): SapphireClient<boolean> {
    if (!process.env.DISCORD_ID || !process.env.DISCORD_TOKEN) throw new Error("INVALID ENV VARS")

    const client = new SapphireClient({ intents: 32767 })

    client.login(process.env.TOKEN)
    
    return client
}