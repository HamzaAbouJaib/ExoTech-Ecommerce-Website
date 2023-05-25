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
          <input
            type="text"
            placeholder="Enter your keywords..."
            className="px-4 py-1 rounded-[2rem] text-lg"
          />
        </div>
        <div className="text-xl">Login/Register</div>
      </div>
    </div>
  );
};

export default Navigation;
