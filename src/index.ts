import { mkdir } from "fs";
import bot from "./bot";
import server from "./router/server"

mkdir('./data', null, (err) => {
    if (err?.code == "EEXIST") {
        return;
    } else {
        throw new Error("bootstrapper :: Failed to initialize data directory")
    }
})

server(3000, process.env.NODE_ENV !== "production")
// export const Instance = bot()