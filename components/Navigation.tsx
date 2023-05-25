import Link from "next/link";

const Navigation = () => {
  return (
    <div className="fixed bg-slate-800 w-full p-6 text-white">
      <div className="w-[80%] flex justify-between items-center m-auto">
        <div className="text-2xl">Tech Store</div>
        <div className="text-xl flex items-center gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/categories"}>Categories</Link>
          <Link href={"/deals"}>Deals</Link>
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
              className="pl-10 pr-4 py-1 rounded-[2rem] text-lg"
            />
          </div>
        </div>
        <div className="text-xl">Login/Register</div>
      </div>
    </div>
  );
};

export default Navigation;
