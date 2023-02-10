import fastify from 'fastify';
import { z } from 'zod'
import prisma from '../../lib/prisma';



export default function main(PORT: number, debug?: boolean) {
    const app = fastify({ logger: debug || false })

    app.get("/", async (_req, _res) => {
        return `
███████ ██   ██  ██████  ███████ ██████ ██  ██ 
██      ██   ██ ██    ██ ██   ██   ██   ██  ██  
███████ ███████ ██    ██ ██████    ██    ████   
     ██ ██   ██ ██    ██ ██   ██   ██     ██    
███████ ██   ██  ██████  ██   ██   ██     ██    
        ` + '\nThis is a server instance automatically launched by shorty.'
    })

    app.route({
        method: "GET",
        url: "/:vanity",
        handler: async (req, res) => {
            const vanity = (req.params as { vanity: string }).vanity

            const urlData = await prisma.link.findUnique({
                where: { vanity: vanity }
            })

            if (urlData) {
                const destUrl = urlData.destUrl

                res.redirect(destUrl)
            } else {
                res.status(404)

                return {
                    status: 404,
                    message: "URL not found!"
                }
            }
        }
    })

    app.post("/api/create", async (req, res) => {
        const bodyValidator = z.object({
            toUrl: z.string().url(),
            vanity: z.string().nullish()
        })

        if (!bodyValidator.safeParse(req.body).success) {
            res.status(400)

            return {
                status: 400,
                message: "Invalid request body"
            }
        }

        const body = req.body as {
            toUrl: string,
            vanity?: string
        }

        try {
            await prisma.link.create({
                data: {
                    vanity: body.vanity || (Math.random() + 1).toString(36).substring(2),
                    destUrl: body.toUrl
                }
            })
        } catch (e) {
            console.log(`router :: Failed to create URL instance ${req.id} in database!`)

            res.status(502)
            return {
                status: 502,
                message: "Internal error"
            }
        }

        res.status(200)

        return {
            status: 200,
            message: "Success"
        }
    })

    app.listen({ port: PORT })
        .catch((err) => {
            console.error("router :: An error occurred when instantiating the server! Error: ", err)
        })
        .then(() => {
            console.log("router :: Server listening on port", PORT)
        })
}