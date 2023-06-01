const CardPrice = ({
  price,
  discount,
}: {
  price: string;
  discount: string;
}) => {
  const numberPrice = Number.parseFloat(price);
  const numberDiscount = Number.parseFloat(discount);
  return (
    <>
      {numberDiscount > 0 ? (
        <>
          <p>
            <span className="text-red-600 font-normal">-{discount}%</span> CA$
            {numberPrice * (1 - numberDiscount / 100)}
          </p>
          <s className="text-slate-600">CA${price}</s>
        </>
      ) : (
        <p>CA${numberPrice}</p>
      )}
    </>
  );
};

export default CardPrice;
