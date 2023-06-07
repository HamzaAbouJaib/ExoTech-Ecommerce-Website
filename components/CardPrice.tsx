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
        <div className="flex flex-col flex-wrap items-end">
          <p className="flex flex-wrap items-end">
            <span className="text-red-600 font-normal">-{discount}%</span> CA$
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(numberPrice * (1 - numberDiscount / 100))}
          </p>
          <s className="text-slate-600">
            CA$
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(numberPrice)}
          </s>
        </div>
      ) : (
        <p>
          CA$
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(numberPrice)}
        </p>
      )}
    </>
  );
};

export default CardPrice;
