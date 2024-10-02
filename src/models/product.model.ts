import db from "../../database/db";
import { Product } from "../types";
import { formatInsertingInputSQL } from "../utils/formatInsertingInputSQL";

const addProduct = async (product: Product) => {
  const [columns, values] = formatInsertingInputSQL(product);
  await db.query(`INSERT INTO public."product" ${columns} VALUES ${values}`);
  return;
};


const productModel = { addProduct };
export default productModel;
