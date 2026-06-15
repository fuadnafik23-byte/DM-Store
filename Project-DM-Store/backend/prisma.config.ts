import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Di sini tempat menaruh URL database Railway Anda
    url: "mysql://root:UQSCmpjHFoIcZXIKifnbAchHvAzSTAuD@ballast.proxy.rlwy.net:42317/railway",
  },
});