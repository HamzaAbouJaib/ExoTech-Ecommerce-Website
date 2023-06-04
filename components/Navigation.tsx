import { CartContext } from "@/store/CartContext";
import Link from "next/link";
import { useContext } from "react";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const { cartProducts } = useContext(CartContext);
  const { status, data: session } = useSession();

  return (
    <div className="fixed bg-slate-900 w-full p-6 text-white shadow-md z-10">
      <div className="w-[80%] flex justify-between items-center m-auto">
        <Link href={"/"} className="text-2xl flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
            />
          </svg>
          ExoTech
        </Link>
        <div className="text-xl flex items-center gap-10">
          <Link className="nav-link" href={"/"}>
            Home
          </Link>
          <Link className="nav-link" href={"/products"}>
            Products
          </Link>
          <Link className="nav-link" href={"/categories"}>
            Categories
          </Link>
          <Link className="nav-link" href={"/hot-deals"}>
            Hot Deals
          </Link>
          <Link href={"/search"} className="flex gap-1 items-center">
            Search
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
        </div>
        <div className="text-xl flex items-end gap-6">
          <Link
            href={status === "authenticated" ? "/account" : "/login"}
            className="flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            {status === "authenticated" ? session.user.name : "Login"}
          </Link>
          <Link href={"/cart"} className="relative flex items-center gap-2">
            <span className="bg-red-600 flex justify-center items-center w-5 h-5 text-base font-semibold rounded-[50%] leading-none absolute -top-2 left-3">
              {cartProducts.length}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
