import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../index.js";

describe("API de tareas", () => {
  it("rechaza crear una tarea con texto vacío", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ text: "" });

    expect(res.status).toBe(400);
  });
});