import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      text: "Tarea inicial de prueba",
      completed: false,
    },
  });

  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Usuario Test",
      email: "test@example.com",
      password: "test-password",
    },
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });