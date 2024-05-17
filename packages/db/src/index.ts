import { PrismaClient } from "@prisma/client";

const prismaSingletion = () => {
  return new PrismaClient();
};

declare global {
  var prismaClient: undefined | ReturnType<typeof prismaSingletion>;
}

const prisma = global.prismaClient ?? prismaSingletion();

export default prisma;

if (process.env.NODE_ENV !== "production") global.prismaClient = prisma;
