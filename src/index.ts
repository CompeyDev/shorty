import { mkdir } from 'fs';
import bot from './bot'
import server from './router/server';

console.log('bootstrapper :: Initializing...');

mkdir('./data', null, (err) => {
  if (err?.code !== 'EEXIST') {
    throw new Error('bootstrapper :: Failed to initialize data directory');
  }
});

void server(3000, process.env.NODE_ENV !== 'production');
export const Instance = bot()

console.log("bootstrapper :: We're up and running!");
