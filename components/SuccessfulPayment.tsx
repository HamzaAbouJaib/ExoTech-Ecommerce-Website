import Link from "next/link";
import Navigation from "./Navigation";

const SuccessfulPayment = () => {
  return (
    <>
      <Navigation />
      <div className="w-[80%] m-auto mb-10 pt-20">
        <div className="border border-gray-300 shadow-md p-16 rounded-xl h-max mt-20 w-[60%] m-auto text-center">
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold mb-3 text-green-600">
            Order Confirmed
          </h1>
          <p className="text-lg mb-16 text-gray-700">
            Thank you for your order. An automated email will be sent to you
            once your order is ready to be shipped.
          </p>
          <Link href={"/"} className="btn-primary text-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default SuccessfulPayment;
