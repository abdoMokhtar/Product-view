/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, use } from "react";
import { ShoppingContext } from "../context/ShoppingCard";

const Item = ({ item }) => {
  const { setCounter, counter, basket, setBasket } =
    useContext(ShoppingContext);
  const [image, setImage] = useState("");
  const countItem = counter[item.index]?.count;

  // (handelRepeat)=> Func To  inccre  Count item in Basket and No repeat Like Item

  const handelRepeat = (e) => {
    const alreadyExists = basket.some((a) => a.index === e.index);
    if (!alreadyExists) setBasket((prev) => [...prev, e]);
  };

  // (handelbasket)=> Func To Add And inccre ,decre item in Basket
  const handelbasket = (item, e) => {
    setCounter((prev) => {
      const newCounter = [...prev];
      e && countItem > 0
        ? (newCounter[item.index] = {
            ...newCounter[item.index],
            count: newCounter[item.index].count - 1,
          })
        : (newCounter[item.index] = {
            ...newCounter[item.index],
            count: newCounter[item.index].count + 1,
          });

      return newCounter;
    });
    handelRepeat(item);
  };

  useEffect(() => {
    const btns = document.querySelectorAll("button");

    const reSize = () => {
      if (window.innerWidth < 640) {
        btns.forEach((e) => e.classList.add("text-[80%]"));
        setImage(item.image.mobile);
      } else if (window.innerWidth < 1024) {
        setImage(item.image.tablet);
      } else {
        setImage(item.image.desktop);
      }
    };

    reSize();

    window.addEventListener("resize", reSize);

    return () => {
      window.removeEventListener("resize", reSize);
    };
  }, [item]);

  return (
    <div
      className="item p-2.5 flex
     items-center flex-col relative min-w-[200px] max-w-[400px]  gap-2.5 "
    >
      {image && (
        <img
          loading="lazy"
          src={image}
          alt=""
          className="hover:border-[3px] hover:border-[#c73a0f] transition-all rounded-xl max-w-72 max-h-72 object-cover"
        />
      )}
      <button
        onClick={() => (countItem > 0 ? "" : handelbasket(item))}
        type="button"
        className="border w-[50%] relative -top-5 bg-[#fcf9f7] font-medium text-base p-2 rounded-2xl"
      >
        {countItem > 0 ? (
          <>
            <span
              className="incremrnt p-1.5 font-bold"
              onClick={() => handelbasket(item)}
            >
              +
            </span>{" "}
            {countItem}{" "}
            <span
              className="decremrnt p-1.5 font-bold "
              onClick={(e) =>
                handelbasket(
                  item,
                  e.currentTarget.classList.contains("decremrnt")
                )
              }
            >
              -
            </span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-cart-shopping mr-2.5 text-[#c73a0f]"></i>{" "}
            Add To Cart
          </>
        )}
      </button>
      <div className="text"></div>
      <b>{item.category}</b>
      <h3>{item.name}</h3>
      <b className="text-[#c73a0f]">Price: ${item.price}</b>
    </div>
  );
};

export default Item;
