import { PrismaClient } from '@prisma/client'

let PRISMA_CLIENT = null;

export const getPrisma = () => {
    if (!PRISMA_CLIENT) {
        PRISMA_CLIENT = new PrismaClient();
    }
    return PRISMA_CLIENT;
}