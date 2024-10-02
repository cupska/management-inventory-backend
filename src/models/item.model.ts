import db from "../../database/db";
// import { Item } from "../types";

const addOneItem = async ({ description, quantity, unit_price }: Item) => {
  return await db.query(
    `INSERT INTO public.item (description,quantity,unit_price) VALUES ($1,$2,$3 )`,
    [description, quantity, unit_price]
  );
};
const updateOneItem = async ({ id, ...data }: Required<Item>) => {
  const set = Object.keys(data)
    .reduce((prev: string[], curr) => {
      prev.push(`${curr}="${data[curr as keyof typeof data]}"`);
      return prev;
    }, [])
    .join(",");
  const aw = await db.query(`UPDATE public.item SET $1 WHERE id = $2`, [
    set,
    id,
  ]);
  return aw;
};
const getAllItems = async () => {
  const { rows } = await db.query(`SELECT * FROM public.item`);
  return rows.map((row: Item) => {
    const { unit_price, ...rest } = row;
    return { unit_price: JSON.parse(unit_price as unknown as string), ...rest };
  });
};
const getOneItem = async (id: string | number) => {
  const { rows } = await db.query(`SELECT * FROM public.item WHERE id = $1`, [
    id,
  ]);
  return rows[0];
};

export { addOneItem, updateOneItem, getAllItems, getOneItem };
