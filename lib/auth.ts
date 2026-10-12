import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// In dev, Next.js reloads files often. Reusing one client avoids opening a new DB connection every time.
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };
const client = globalForMongo.mongoClient ?? new MongoClient(process.env.MONGODB_URI!);
if (process.env.NODE_ENV !== "production") globalForMongo.mongoClient = client;

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  // Google and GitHub get added in the next step
});