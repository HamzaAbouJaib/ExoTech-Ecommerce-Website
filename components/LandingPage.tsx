const LandingPage = () => {
  return (
    <div className="h-[80dvh] pt-16 bg-slate-900 flex items-center text-white">
      <div className="w-[80%] m-auto grid grid-cols-2 gap-32">
        <div className="flex flex-col gap-8 justify-center">
          <h1 className="text-5xl font-semibold">Samsung Galaxy S23 Ultra</h1>
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
        <div className="flex justify-end items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/722/945/original/samsung-galaxy-s23-ultra-transparent-image-free-png.png"
            alt="Samsung Galaxy S23 Ultra"
            className="w-[90%]"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
