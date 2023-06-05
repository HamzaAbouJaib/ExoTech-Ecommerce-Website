const LandingPage = () => {
  return (
    <div className="lg:min-h-[80dvh] h-max max-lg:pb-16 pt-16 bg-slate-900 flex items-center text-white">
      <div className="w-[80%] m-auto grid lg:grid-cols-2 lg:gap-32 max-lg:pt-10">
        <div className="flex flex-col gap-8 justify-center max-lg:order-2">
          <h1 className="lg:text-5xl text-3xl font-semibold">Samsung Galaxy S23 Ultra</h1>
          <p className="text-lg text-slate-200">
            Meet the new Galaxy S23 Ultra, designed for better sustainability
            and equipped with a built-in S Pen, Nightography camera and powerful
            chip for epic gaming
          </p>
          <div className="flex gap-5 text-xl mt-5">
            <button className="btn-secondary">Read More</button>
            <button className="btn-primary">Add to Cart</button>
          </div>
        </div>
        <div className="flex lg:justify-end justify-center items-center max-lg:order-1">
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/722/945/original/samsung-galaxy-s23-ultra-transparent-image-free-png.png"
            alt="Samsung Galaxy S23 Ultra"
            className="lg:w-[90%] w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
