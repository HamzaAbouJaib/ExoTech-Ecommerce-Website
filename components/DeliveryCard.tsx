import { useState } from "react";

const DeliveryCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

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
        <label>Address</label>
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Postal Code</label>
        <input
          type="text"
          placeholder="Postal Code"
          name="postal-code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <label>City</label>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button className="btn-primary mt-5 w-full">Continue to Payment</button>
      </div>
    </div>
  );
};

export default DeliveryCard;