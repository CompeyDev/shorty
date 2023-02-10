import bot from "./bot";
import server from "./router/server"

server(3000, process.env.ENVIRONMENT !== "prod")
// export const Instance = bot()