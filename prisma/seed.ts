import { PrismaClient } from "@prisma/client";
import productData from "./data/product.json";
import cartItemData from "./data/cartitem.json";
import transactionData from "./data/transaction.json";
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
      username: "kasir1",
      password: await hash("password", 10),
      role: "KASIR",
    },
  });

  await prisma.user.create({
    data: {
      username: "kasir2",
      password: await hash("password", 10),
      role: "KASIR",
    },
  });

  await prisma.user.create({
    data: {
      username: "kasir3",
      password: await hash("password", 10),
      role: "KASIR",
    },
  });

  await prisma.user.create({
    data: {
      username: "kasir4",
      password: await hash("password", 10),
      role: "KASIR",
    },
  });

  await prisma.user.create({
    data: {
      username: "kasir5",
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

  await prisma.product.createMany({
    data: productData,
  });

  for (const eachTransaction of transactionData) {
    await prisma.transaction.create({
      data: {
        userId: eachTransaction.userId,
        date: new Date(eachTransaction.date),
      },
    });
  }

  await prisma.cartItem.createMany({
    data: cartItemData,
  });
}

main().catch(console.log);
