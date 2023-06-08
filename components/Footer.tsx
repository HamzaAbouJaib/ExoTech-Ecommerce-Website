import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-slate-900 w-screen p-6 text-white mt-24">
      <div className="w-[80%] m-auto my-6 grid lg:grid-cols-6 items-start gap-6 lg:gap-32 2xl:gap-64">
        <Link
          href={"/"}
          className="text-2xl flex items-center gap-1 col-span-2"
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
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
            />
          </svg>
          ExoTech
        </Link>
        <div className="col-span-4 grid sm:grid-cols-3 grid-cols-2 max-sm:gap-7">
          <div className="flex flex-col gap-3">
            <h5 className="font-semibold text-lg">Sitemap</h5>
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/hot-deals"}>Hot Deals</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="font-semibold text-lg">Support</h5>
            <p>Live Support</p>
            <p>Help</p>
            <p>FAQ</p>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="font-semibold text-lg">Legal</h5>
            <p>Refund Policy</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-12 mb-5">
        Copyright &copy; ExoTech 2023
      </div>
    </div>
  );
};

export default Footer;
