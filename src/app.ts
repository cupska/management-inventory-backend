import express from "express";
import itemRouter from "./routers/item.router";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import productRouter from "./routers/product.router";
import db from "../database/db";
import imageRouter from "./routers/image.router";
const app = express();
export default app;

const PORT = 4000;

app.use(bodyParser.json());
// app.use(itemRouter);
app.use(productRouter);
app.use(imageRouter);

app.use(errorHandler);

// app.listen(PORT, () => console.log("berjalan di port: ", PORT));
