import { Event } from "../structures/Event";
import { writeFile, writeFileSync } from "fs";
import { client, reply, replyAlone, replyEnd } from ".."
import { presenceStore } from "../../lib/libPresence"

async function arrayify(command, cmdsArr, commands): Promise<any> {
    cmdsArr.push(command.name)
    if (cmdsArr.length == commands.size) {
        console.log(cmdsArr)
        cmdsArr.forEach((cmd) => {
            cmd = cmd.replace(cmd.charAt(cmd.length - 1), `${cmd.charAt(cmd.length - 1)}`)
            cmd = cmd.replace(/(\r\n|\n|\r)/gm,"")
            let res = cmd;
            if (res == cmdsArr[cmdsArr.length - 1].toString()) {
                res = cmd.replace(cmd.charAt(cmd.length - 1), "")
                res = `${replyEnd} ` + res + "\n"
            } else {
                res = cmd.replace(cmd.charAt(cmd.length - 1), "")
                res = `${reply} ` + res
            }
            console.log(res.replace(/(\r\n|\n|\r|\s)/gm, ""))
            return res
        });

    }
}

async function fetchCommands() {
    let cmdsArr: string[] = []
    client.guilds.cache.get("1012355140507930725").commands.fetch()
        .then(commands => commands.forEach(async command => {
            // console.log()
            // writeFileSync("./commands.txt", `${await arrayify(command, cmdsArr, commands)}`)
            // console.log(cmds)
            // writeFileSync("./commands.txt", `${cmds}`)
        }))// console.log(`Fetched ${commands.size} commands`) )
        .catch(console.error);
    console.log(cmdsArr)
    // writeFileSync("./commands.txt", `${cmdsArr}`)
    Promise.resolve()
}

export default new Event("ready", async () => {
    // await fetchCommands()// .then(a => console.log("Bot is online"))
    try {
    const store = new presenceStore()
    const type = (await store.get())[0].presenceType;
    const presence = (await store.get())[0].presence;
    console.log("Echo is active and ready to report!")
    console.log("libPresence :: Constructed presence -> ", type, presence)
    client.user?.setActivity(presence, { type: type });
    } catch(e) {  }
});
