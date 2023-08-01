declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            GUILD_ID: string;
            ENVIRONMENT: "dev" | "prod" | "debug";
            OWNER_ID: string
            PRESENCE_MESSAGE: string,
            PORT: string
        }
    }
}

export {};
