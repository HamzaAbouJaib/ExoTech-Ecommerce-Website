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
            <span className="text-red-600 font-normal">-{discount}%</span> $
            {numberPrice * (1 - numberDiscount / 100)}
          </p>
          <s className="text-slate-600">${price}</s>
        </>
      ) : (
        <p>${numberPrice}</p>
      )}
    </>
  );
};

export default CardPrice;
