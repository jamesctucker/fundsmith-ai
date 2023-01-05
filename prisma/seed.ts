import { prisma } from "./prisma_client";
import { contentModels } from "./seeds/content_model";

// promise function that creates content types
async function createContentModels() {
  for (const contentModel of contentModels) {
    await prisma.contentModel.create({
      data: contentModel,
    });
  }
  console.log("🌱 Successfully seeded content types.");
}

async function main() {
  await createContentModels();

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
