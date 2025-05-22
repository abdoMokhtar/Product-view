/* eslint-disable no-unused-vars */
import { useEffect, useContext } from "react";
import { ShoppingContext } from "../context/ShoppingCard";

const Basket = ({ item }) => {
  const { counter } = useContext(ShoppingContext);

  useEffect(() => {}, [counter]);
  const count = counter[item.index]?.count ?? 0;
  const total = item.price * count;

  return count > 0 ? (
    <div>
      <div
        className="item p-2.5 flex
   items-center flex-col relative min-w-[250px] max-w-[400px]  gap-5 border-b-amber-600  border-b-2 "
      >
        <h3>{item.name}</h3>
        <b>Count :{count} Peice</b>
        <b className="">Price: ${item.price}</b>
        <b className="text-[#c73a0f] total ">total: ${total}</b>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Basket;
