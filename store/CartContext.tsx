import React, { createContext, useEffect, useState } from "react";

type CartProps = {
  children: React.ReactNode;
};

type CategoriesContextType = {
  cartProducts: String[];
  addProductToCart: (id: string) => void;
  removeProductFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CategoriesContextType>({
  cartProducts: [],
  addProductToCart: (id: string) => {},
  removeProductFromCart: (id: string) => {},
  clearCart: () => {},
});

export function CartContextProvider({ children }: CartProps) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (ls && ls.getItem("cartProducts")) {
      setCartProducts(JSON.parse(ls.getItem("cartProducts") as string));
    }
  }, []);

  // useEffect(() => {
  //   if (ls && cartProducts?.length > -1) {
  //     ls.setItem("cartProducts", JSON.stringify(cartProducts));
  //   }
  // }, [cartProducts]);

  function updateLocalStorage(newCart: string[]) {
    if (ls && cartProducts?.length > -1) {
      ls.setItem("cartProducts", JSON.stringify(newCart));
    }
  }

  function addProductToCart(productId: string) {
    setCartProducts((prev) => {
      updateLocalStorage([...prev, productId]);
      return [...prev, productId];
    });
  }

  function removeProductFromCart(productId: string) {
    setCartProducts((prev) => {
      const productIndex = prev.indexOf(productId);
      if (productIndex !== -1) {
        updateLocalStorage(
          prev.filter((value, index) => index !== productIndex)
        );
        return prev.filter((value, index) => index !== productIndex);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    updateLocalStorage([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
