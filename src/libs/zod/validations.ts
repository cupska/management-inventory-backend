import { z } from "zod";
import { Status } from "../../types";
import { File } from "buffer";

// export const UserValidation = z.object({
//   id: z.number(),
//   fullname: z.string().max(100),
//   image: z.string().max(255),
//   role: z.string().max(255),
//   username: z.string().max(100),
//   password: z.string().max(100),
//   created_at: z.date(),
//   updated_at: z.date(),
// });

// export const ProductValidation = z.object({
//   id: z.number(),
//   name: z.string().max(100),
//   image: z.string().max(100),
//   sell_price: z.number(),
//   buy_price: z.number(),
//   category_id: z.number(),
//   amount: z.number(),
//   created_at: z.date(),
//   updated_at: z.date(),
// });

// export const CategoryValidation = z.object({
//   id: z.number(),
//   name: z.string().max(100),
// });

// export const ImageValidation = z.object({
//   name: z.string().max(255),
//   data: z.instanceof(FileList),
// });

export const ItemValidation = z.object({
  id: z.number().optional(),
  description: z.string().max(255),
  unit_price: z.coerce.number(),
  quantity: z.coerce.number(),
});

export const TransactionValidation = z.object({
  id: z.number(),
  transaction_type: z.string().max(50),
  quantity: z.number(),
  transaction_date: z.date(),
});

export const OrderValidation = z.object({
  id: z.number(),
  order_date: z.date(),
  customer_supplier: z.string().max(255),
  status: z.nativeEnum(Status),
});

export const productValidation = z.object({
  id: z.number().optional(),
  name: z.string().max(100),
  image: z.string().optional(),
  sell_price: z.number(),
  buy_price: z.number(),
  category_id: z.number(),
  amount: z.coerce.number().optional(),
  updated_at: z.date().optional(),
  created_at: z.date().optional(),
});

export const userValidation = z.object({
  id: z.number(),
  fullname: z.string().max(100),
  image: z.string().max(255).optional(),
  role: z.string().max(255),
  username: z.string().max(100),
  password: z.string().max(100),
  createat: z.date(),
  updateat: z.date(),
});

export const register = userValidation.omit({
  id: true,
});

export const imageValidation = z.object({
  image: z.string(),
});

export const categoryValidation = z.object({
  id: z.number(),
  name: z.string(),
});
