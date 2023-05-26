import Link from "next/link";

const Navigation = () => {
  return (
    <div className="fixed bg-slate-900 w-full p-6 text-white shadow-md">
      <div className="w-[80%] flex justify-between items-center m-auto">
        <div className="text-2xl">Tech Store</div>
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
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 absolute top-[50%] translate-y-[-50%] left-3 text-slate-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              placeholder="Enter your keywords..."
              className="pl-10 pr-4 py-1 rounded-[2rem] text-lg w-[300px]"
            />
          </div>
        </div>
        <div className="text-xl flex items-end gap-4">
          <Link href={"/cart"} className="relative">
            <span className="bg-red-600 flex justify-center items-center w-5 h-5 text-base font-semibold rounded-[50%] leading-none absolute -top-2 left-3">
              0
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
          </Link>
          <p>Login/Register</p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
