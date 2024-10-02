import { z } from "zod";
import {
  // CategoryValidation,
  // ImageValidation,
  // ProductValidation,
  // UserValidation,
  ItemValidation,
  OrderValidation,
  productValidation,
  TransactionValidation,
  userValidation,
} from "./libs/zod/validations";

enum Status {
  SUCCEED,
  FAILED,
}

type Product = z.infer<typeof productValidation>;
type User = z.infer<typeof userValidation>;
export { Product, User, Status };
