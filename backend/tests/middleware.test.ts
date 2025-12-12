import request from "supertest";
import { app } from "../src/server";

describe("Authenticate middleware", () => {

  beforeAll(() => {
    process.env.API_KEY = "test-api-key";
  });

  app.get("/protectedTest", (req, res) => {
    res.status(200).json({ message: "Protected route accessed" });
  });

  it("should return 401 when API key is missing", async () => {
    const response = await request(app).get("/protectedTest");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Unauthorized",
      message: "Missing API key",
    });
  });

  it("should return 403 if the API key is invalid", async () => {
    const response = await request(app)
      .get("/protectedTest")
      .set("x-api-key", "invalid-key");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "Forbidden",
      message: "Invalid API key",
    });
  });

  it("should return 200 if the API key is valid", async () => {
    const response = await request(app)
      .get("/protectedTest")
      .set("x-api-key", "test-api-key");

    expect(response.status).toBe(200);
  })
});
