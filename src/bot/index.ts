import { SapphireClient } from '@sapphire/framework';
import { join } from 'path';

export default function main(): SapphireClient<boolean> {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!process.env.DISCORD_ID || !process.env.DISCORD_TOKEN) throw new Error('INVALID ENV VARS');

  const client = new SapphireClient({ intents: 32767, baseUserDirectory: "./src/bot/commands"});

  void client.login(process.env.TOKEN);

  return client;
}
