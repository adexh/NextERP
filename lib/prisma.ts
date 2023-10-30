import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = new PrismaClient().$extends({
  result: {
    clients: {
      fullName: {
        // the dependencies
        needs: { first_name: true, last_name: true },
        compute(client) {
          // the computation logic
          return `${client.first_name} ${client.last_name}`
        },
      },
    },
  },
});

//Global.prisma giving type error
//@ts-expect-error
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;