import { isMessageInstance } from '@sapphire/discord.js-utilities'
import { type ChatInputCommand, Command } from '@sapphire/framework'

export class PingCommand extends Command {
  public constructor (context: Command.Context, options: Command.Options) {
    super(context, { ...options })
  }

  public override registerApplicationCommands (registry: ChatInputCommand.Registry): void {
    registry.registerChatInputCommand((builder) =>
      builder.setName('ping').setDescription('🤔')
    )
  }

  public async chatInputRun (interaction: Command.ChatInputCommandInteraction): Promise<any> {
    const msg = await interaction.reply({ content: 'ping?', fetchReply: true })

    if (isMessageInstance(msg)) {
      return interaction.editReply('pong!')
    }

    return interaction.editReply('woops, this shouldn\'t be happening...')
  }
}
