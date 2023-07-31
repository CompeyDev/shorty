import { CommandType } from "../typings/Command";

export class Command {
    constructor(commandOptions: CommandType) {
        var { options } = commandOptions;
        Object.assign(this, commandOptions);
    }
}
 