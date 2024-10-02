import supertest from "supertest";
import app from "../src/app";
import { Product } from "../src/types";
import { readFile, readFileSync } from "fs";
import path from "path";
import { SUCCESS_CREATED_MSG } from "../src/constants";
import db from "../database/db";
import { z } from "zod";
import { deepEqual } from "assert";
// import defaultImage from "../src/assets/default.png";

describe.skip("POST one Product", () => {
  const productData: Product = {
    name: "biskuat",
    amount: 2000,
    buy_price: 4700,
    category_id: 4,
    sell_price: 5000,
  };
  const productURI = "/api/product";
  const uploadURI = "/api/image";

  // afterAll(() => {
  //   it("DELETE product test", async () => {
  //     expect(productData).toHaveProperty("id");
  //     const { body } = await supertest(app)
  //       .delete(productURI + "/" + productData.id)
  //       .expect(200);
  //   });
  //   db.end();
  // });
  describe("with Image input", () => {
    const productWithImage = {
      image: undefined,
      ...productData,
    } satisfies Product;
    it("POST add image", async () => {
      const img = path.join("src", "assets", "sample", "biskuat.webp");
      const { body } = await supertest(app)
        .post(uploadURI)
        .attach("image", img)
        .expect(201);
      expect(body).toHaveProperty("message", SUCCESS_CREATED_MSG);
      expect(typeof body.data.name).toBe("string");
      productWithImage.image = body.data.name;
    });
    it("POST rest of the Form", async () => {
      expect(productData.image).toBeTruthy();
      const { body } = await supertest(app)
        .post(productURI)
        .send(productData)
        .expect(201);
      expect(body).toHaveProperty("message", SUCCESS_CREATED_MSG);
    });
  });
  it("success without image value", async () => {
    const { body } = await supertest(app)
      .post(productURI)
      .send(productData)
      .expect(201);
    expect(body).toHaveProperty("message", SUCCESS_CREATED_MSG);
  });
  it("return error validation", async () => {
    const iIncorrectdataProduct = productData;
    iIncorrectdataProduct.amount = "mantap" as unknown as number;
    await supertest(app)
      .post(productURI)
      .send(iIncorrectdataProduct)
      .expect(400);
  });
});

// describe.only("PUT update product", () => {
//   const baseURI = "/api/product";
//   it("succsess", async () => {
//     const {} = await supertest(app).put(baseURI).send();
//   });
// });
