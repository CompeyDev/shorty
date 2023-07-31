import prisma from "./prisma";

export class presenceStore {
    type: String = '';
    presence: string = '';
    constructor() {
        this.presence = null;
        this.type = null;
    }

    public update = async (presence: string, type: string): Promise<void> => await prisma.datastore.update({
        where: {
            id: 1
        },
        data: {
            presence: presence,
            presenceType: type
        }
    });

    public async get(): Promise<[{ id: 1, presence: string, presenceType: "PLAYING" | "COMPETING" | "LISTENING" | "WATCHING" }]> {
        try {
        const data = await prisma.datastore.findMany({
            where: {
                id: 1
            },
        })
        console.log("libPresence :: Unpacked data -> ", data)
        return data
        } catch(e) { }
    }
}

