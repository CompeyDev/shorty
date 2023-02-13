declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_ID: number;
      DISCORD_TOKEN: string;
      NODE_ENV: 'development' | 'production' | 'debug';
      DOMAIN_URI: string;
    }
  }
}

export {};
