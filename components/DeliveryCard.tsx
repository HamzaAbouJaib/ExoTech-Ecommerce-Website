import { CartContext } from "@/store/CartContext";
import axios from "axios";
import { useContext, useState } from "react";

const DeliveryCard = () => {
  const { cartProducts } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);

  async function proceedToPayment() {
    if (name === "") {
      setEmptyName(true);
      return;
    }

    if (email === "") {
      setEmptyEmail(true);
      return;
    }

    const response = await axios.post("/api/checkout", {
      name,
      email,
      mobile,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  return (
    <div className="border border-gray-300 shadow-md p-10 rounded-xl h-max">
      <h3 className="mb-1 font-semibold text-gray-800">Delivery Information</h3>
      <div className="flex flex-col delivery gap-1">
        <label>
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => {
            if (e.target.value !== "") {
              setEmptyName(false);
            }
            setName(e.target.value);
          }}
        />
        {emptyName && (
          <p className="text-sm text-red-600">Name field is required</p>
        )}
        <label>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => {
            if (e.target.value !== "") {
              setEmptyEmail(false);
            }
            setEmail(e.target.value);
          }}
        />
        {emptyEmail && (
          <p className="text-sm text-red-600">Email field is required</p>
        )}
        <label>Mobile Number <span className="text-xs text-gray-500">(Optional)</span></label>
        <input
          type="text"
          placeholder="Mobile Number"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button className="btn-primary mt-5 w-full" onClick={proceedToPayment}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default DeliveryCard;
