const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Set it in Vercel > Settings > Environment Variables and redeploy."
  );
}

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };
const client = globalForMongo.mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo.mongoClient = client;

import dns from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Dev-only workaround: some ISPs/routers block MongoDB's SRV DNS lookup
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}
export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});

console.log(
  "ENV KEYS SEEN:",
  Object.keys(process.env).filter((k) => /MONGO|BETTER|GOOGLE|GITHUB/i.test(k))
);