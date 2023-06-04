import Navigation from "@/components/Navigation";
import OrderHistory from "@/components/OrderHistory";
import PersonalInfo from "@/components/PersonalInfo";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function AccountPage() {
  const { data: session } = useSession();

  const [active, setActive] = useState("personal");

  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <div className="mt-20 flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold">Account Information</h2>
          <button
            className="btn-primary text-xl h-max"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            LogOut
          </button>
        </div>
        <hr className={"w-full border-gray-300"}></hr>
        <div className="grid grid-cols-3 mt-12">
          <div className="text-xl font-semibold text-gray-500 flex flex-col gap-2">
            <p
              className={`cursor-pointer w-max ${
                active === "personal" && "text-primary"
              }`}
              onClick={() => setActive("personal")}
            >
              Personal Information
            </p>
            <p
              className={`cursor-pointer w-max  ${
                active === "orders" && "text-primary"
              }`}
              onClick={() => setActive("orders")}
            >
              Order History
            </p>
          </div>
          <div className="col-span-2">
            {active === "personal" && <PersonalInfo />}
            {active === "orders" && <OrderHistory />}
          </div>
        </div>
      </div>
    </>
  );
}
