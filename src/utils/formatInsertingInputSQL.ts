/**.
 *Mengubah Object input dan memecah menjadi 2 variable column dan val untuk di gunakan di sql method INSERT
 * @returns ["(id,name,price)", "(1,"kopi hitam",5200)"]
 */

export const formatInsertingInputSQL = (set = {}) => {
  let columns = Object.keys(set)
    .map((key) => key)
    .join(",");
  let values = Object.values(set)
    .map((val) => `'${val}'`)
    .join(",");

  columns = `(${columns})`;
  values = `(${values})`;
  console.log(columns, values);
  return [columns, values];
};
