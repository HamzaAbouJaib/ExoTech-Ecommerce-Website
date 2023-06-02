import { CartContext } from "@/store/CartContext";
import axios from "axios";
import { useContext, useState } from "react";

const DeliveryCard = () => {
  const { cartProducts } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  async function proceedToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      mobile,
      city,
      postalCode,
      country,
      address,
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
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mobile Number</label>
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
