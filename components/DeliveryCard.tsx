const DeliveryCard = () => {
  return (
    <div className="border border-gray-300 shadow-md p-10 rounded-xl h-max">
      <h3 className="mb-1 font-semibold text-gray-800">Delivery Information</h3>
      <div className="flex flex-col delivery gap-1">
        <label>Name</label>
        <input type="text" placeholder="Name" />
        <label>Email</label>
        <input type="email" placeholder="Email" />
        <label>Mobile Number</label>
        <input type="text" placeholder="Mobile Number" />
        <label>Address</label>
        <input type="text" placeholder="Address" />
        <label>Postal Code</label>
        <input type="text" placeholder="Postal Code" />
        <label>City</label>
        <input type="text" placeholder="City" />
        <label>Country</label>
        <input type="text" placeholder="Country" />{" "}
        <button className="btn-primary mt-5 w-full">Continue to Payment</button>
      </div>
    </div>
  );
};

export default DeliveryCard;
