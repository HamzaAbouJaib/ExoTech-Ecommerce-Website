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
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1 mb-1">
            <p>
              CA$
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(numberPrice * (1 - numberDiscount / 100))}
            </p>
            <span className="text-red-600 font-normal">-{discount}%</span>
          </div>
          <s className="text-slate-500">
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
