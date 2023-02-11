import { SapphireClient } from '@sapphire/framework'

const DISCORD_ID = process.env.DISCORD_ID
const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const invalidVariables = (
  (DISCORD_ID == null || DISCORD_ID === undefined) ||
  (DISCORD_TOKEN == null || DISCORD_TOKEN === undefined)
)

export default function main (): SapphireClient<boolean> {
  if (invalidVariables) throw new Error('INVALID ENV VARS')

  const client = new SapphireClient({ intents: 32767 })

  void client.login(process.env.TOKEN)

  return client
}
