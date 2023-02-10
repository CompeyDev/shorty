import fastify from 'fastify';
import { z } from 'zod'

export default function main(PORT: number, debug: boolean) {
    const app = fastify({ logger: debug })

    app.get("/", async (_req, _res) => {
        return 'This is a server instance automatically launched by shorty.'
    })

    app.post("/api/create", async (req, res) => {
        const bodyValidator = z.object({
            toUrl: z.string().url(),
            vanity: z.string().nullish()
        })
        console.log(typeof req.body)
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

        app.all(body.vanity || (Math.random() + 1).toString(36).substring(2), async (_, res) => {
            res.redirect(body.toUrl)
        })

        return {
            status: 200,
            message: "Success"
        }
    })

    app.listen({ port: PORT })
        .catch((err) => {
            console.error("An error occurred when instantiating the server! Error: ", err)
        })
        .then(() => {
            console.log("Server listening on port ", PORT)
        })
}