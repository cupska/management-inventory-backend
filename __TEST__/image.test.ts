import supertest from "supertest";
import app from "../src/app";
import path from "path";
import { SUCCESS_CREATED_MSG } from "../src/constants";
import db from "../database/db";

// afterAll(() => db.end());
describe("POST add image", () => {
  afterAll(() => db.end());
  it("add", async () => {
    const baseURI = "/api/image";
    const img = path.join("src", "assets", "sample", "biskuat.webp");
    const { body } = await supertest(app).post(baseURI).attach("image", img);
    // .expect(201);
    console.log({ body, img });

    // expect(body).toHaveProperty("message", SUCCESS_CREATED_MSG);
  });
});
