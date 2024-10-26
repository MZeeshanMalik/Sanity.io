import { createClient } from "next-sanity";
const token = process.env.SANITYIOTOKEN;
export const client = createClient({
  projectId: `${process.env.PROJECTID}`,
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});
