/* eslint-disable no-unused-vars */

import { useContext } from "react";
import Item from "./Components/Item";
import { ShoppingContext } from "./context/ShoppingCard";
import Basket from "./Components/basket";
const App = () => {
  const { items, basket, total, num } = useContext(ShoppingContext);

  return (
    <>
      <header className="flex justify-between items-center px-8 py-4 bg-gray-100 shadow-sm">
        <h1 className="font-extrabold text-3xl text-gray-800">Desserts</h1>

        <i
          className="fa-solid fa-cart-shopping relative text-2xl text-black cursor-pointer transition duration-200 hover:scale-110 "
          onClick={() =>
            document.querySelector(".basket").classList.toggle("show")
          }
        >
          <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {num}
          </span>
        </i>
      </header>
      <div className="flex flex-col items-center sm:items-start lg:flex-row gap-4 family ">
        <div className="preview flex flex-wrap gap-4 justify-center w-full max-w-[1000px] mx-auto">
          {items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
        <div className="basket hidden max-w-[300px] sm-h-screen bg-white shadow-lg rounded-lg p-4 text-sm text-center ">
          {basket.map((item, index) => (
            <Basket item={item} key={index} />
          ))}
          <p className="text-2xl">
            Total: <span className=" text-[#c73a0f] ">${total}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
