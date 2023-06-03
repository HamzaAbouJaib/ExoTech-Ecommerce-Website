import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AccountForm from "./AccountForm";

type CustomerType = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
};

const PersonalInfo = () => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState<CustomerType>();

  useEffect(() => {
    if (!session) return;
    axios.get("/api/customers?email=" + session.user.email).then((response) => {
      setCustomer(response.data);
    });
  }, [session]);

  return (
    <div className="text-lg">
      <h1 className="text-2xl font-semibold leading-none">
        Personal Information
      </h1>
      <p className="text-gray-600 mb-2">Manage you personal information</p>
      {customer && (
        <AccountForm preloaded={customer} />
      )}
    </div>
  );
};

export default PersonalInfo;
