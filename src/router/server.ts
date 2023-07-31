/* eslint-disable no-irregular-whitespace */
import fastify from 'fastify';
import { z } from 'zod';
import prisma from '../../lib/prisma';
import path from 'path';

import fastify_static = require('@fastify/static');

export default async function main(
  PORT: number,
  debug?: boolean
): Promise<void> {
  const rootUri = process.env.DOMAIN_URI;
  if (rootUri == null || rootUri === undefined) {
    throw new Error(
      'router :: Expected env variable DOMAIN_URI to be set.'
    );
  }

  const app = fastify({ logger: debug ?? false });

  await app.register(fastify_static, {
    root: path.join(process.cwd(), 'public'),
    prefix: '/static'
  });

  app.get('/', async () => {
    return (
      `
███████ ██   ██  ██████  ███████ ██████ ██  ██ 
██      ██   ██ ██    ██ ██   ██   ██   ██  ██  
███████ ███████ ██    ██ ██████    ██    ████   
     ██ ██   ██ ██    ██ ██   ██   ██     ██    
███████ ██   ██  ██████  ██   ██   ██     ██    
        ` + '\nThis is a server instance automatically launched by shorty.'
    );
  });

  app.route({
    method: ['GET', 'POST', 'PUT'],
    url: '/:vanity',
    handler: async (req, res) => {
      const vanity = (req.params as { vanity: string }).vanity;

      const urlData = await prisma.link.findUnique({
        where: { vanity }
      });

      if (urlData != null) {
        const destUrl = urlData.destUrl;

        await res.redirect(destUrl);
      } else {
        await res.code(404).sendFile('404.html');
      }
    }
  });

  app.post('/api/create', async (req, res) => {
    const bodyValidator = z.object({
      toUrl: z.string().url(),
      vanity: z.string().nullish()
    });

    if (!bodyValidator.safeParse(req.body).success) {
      await res.code(400).send({
        status: 400,
        message: 'Invalid request body'
      });
    }

    const body = req.body as {
      toUrl: string;
      vanity?: string;
    };

    const routeUrl =
      body.vanity ?? (Math.random() + 1).toString(36).substring(2);

    try {
      await prisma.link.create({
        data: {
          vanity: routeUrl,
          destUrl: body.toUrl
        }
      });
    } catch (err) {
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `router :: Failed to create URL instance ${req.id} in database!`
      );

      await res.code(502).send({
        status: 502,
        message: 'Internal server error'
      });
    }

    await res.code(200).send({
      status: 200,
      message: 'Success',
      url: rootUri.endsWith('/')
        ? rootUri + routeUrl
        : rootUri + '/' + routeUrl
    });
  });

  await app
    .listen({ host: rootUri, port: PORT })
    .catch((err) => {
      console.error(
        'router :: An error occurred when instantiating the server! Error: ',
        err
      );
    })
    .then(() => {
      console.log('router :: Server listening on port', PORT);
    });
}
