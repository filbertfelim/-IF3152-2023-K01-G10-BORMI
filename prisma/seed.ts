import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      password: await hash("password", 10),
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      username: "kasir",
      password: await hash("password", 10),
      role: "KASIR",
    },
  });

  await prisma.user.create({
    data: {
      username: "inventaris",
      password: await hash("password", 10),
      role: "INVENTARIS",
    },
  });
}

main().catch(console.log);
