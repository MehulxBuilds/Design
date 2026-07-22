import { client } from "@/lib/db";
import { randomBytes } from "node:crypto";

async function main() {
  const key = `dk_${randomBytes(32).toString("hex")}`;

  const accessKey = await client.accessKey.create({
    data: {
      key,
      updatedAt: new Date(),
    },
  });

  console.log("Generated access key:");
  console.log(accessKey.key);
}

main()
  .catch((error) => {
    console.error("Failed to generate access key:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.$disconnect();
  });