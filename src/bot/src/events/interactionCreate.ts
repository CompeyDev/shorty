import { Event } from "../structures/Event";
import { interactionManager } from '../../lib/libInteraction';


export default new Event("interactionCreate", async (interaction) => {
    interactionManager(interaction)
 }); 