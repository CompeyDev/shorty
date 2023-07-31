import prisma from "./prisma";

export class userStore {
  level: number = 0;
  messageCount: number = 0;
  id: BigInt | any = 0;
  constructor(id: BigInt) {
    this.id = id;
    // this.messageCount = 0;
    // this.level = 0;
  }

  public create = async (messageCount: number, level: number, id: BigInt) =>
    await prisma.user.create({
      data: {
        id: id,
        messageCount: messageCount,
        level: level,
      },
    });

  public async get(
    id: BigInt
  ): Promise<[{ id: BigInt; messageCount: number; level: number }] | []> {
    let data = await prisma.user.findMany({
      where: {
        id: id,
      }
    });
    return data
  }

  public update = async (id: BigInt, messageCount: number, level: number) =>
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        messageCount: messageCount,
        level: level,
      },
    });
}
