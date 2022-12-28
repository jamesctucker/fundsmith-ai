import { prisma } from "./prisma_client";
import { contentTypes } from "./seeds/content_type";

// promise function that creates content types
async function createContentTypes() {
  for (const contentType of contentTypes) {
    await prisma.contentType.create({
      data: contentType,
    });
  }
  console.log("🌱 Successfully seeded content types.");
}

async function main() {
  createContentTypes();

  console.log("✅ Successfully completed seeding.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
