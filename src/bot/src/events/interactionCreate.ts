import { Event } from "../structures/Event";
import { InteractionManager } from '../../lib/libInteraction';


export default new Event("interactionCreate", async (interaction) => {
    InteractionManager(interaction)
 }); 