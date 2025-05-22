/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useMemo } from "react";
export const ShoppingContext = createContext();

const initialValue = localStorage.getItem("counter")
  ? JSON.parse(localStorage.getItem("counter"))
  : [];
const initialbasketValue = localStorage.getItem("basket")
  ? JSON.parse(localStorage.getItem("basket"))
  : [];

const ShoppingCardProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [basket, setBasket] = useState(initialbasketValue);
  const [counter, setCounter] = useState(initialValue);

  // No Repeat Items In basket

  const total = useMemo(() => {
    return basket.reduce((acc, item) => {
      const count = counter[item.index]?.count ?? 0;
      return acc + item.price * count;
    }, 0);
  }, [basket, counter]);

  const num = useMemo(() => {
    return basket.reduce((acc, item) => {
      const count = counter[item.index]?.count ?? 0;
      return acc + count;
    }, 0);
  }, [basket, counter]);

  // Fetch Data From JSON File
  useEffect(() => {
    async function fechData() {
      try {
        const req = await fetch("/data.json");
        const data = await req.json();
        setItems(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fechData();
  }, []);

  // Set LocalStorage Items Counter

  useEffect(() => {
    if (initialValue.length === 0 && items.length > 0) {
      setCounter(() => items.map(() => ({ count: 0 })));
    }
  }, [items]);

  // Save LocalStorage basket and Counter

  useEffect(() => {
    if (counter.length > 0) {
      localStorage.setItem("counter", JSON.stringify(counter));
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [counter, basket]);

  return (
    <ShoppingContext.Provider
      value={{
        counter,
        setCounter,
        items,
        setItems,
        basket,
        setBasket,
        num,
        total,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingCardProvider;
