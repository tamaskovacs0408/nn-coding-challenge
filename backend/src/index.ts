import app from "./server.js";
import { cacheBarbers } from "./services/barbers.cache.js";

await cacheBarbers();

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
})