import { getCachedBarbers } from "./barbers.cache.js";

export default async function getBarbers() {
  return getCachedBarbers();
}