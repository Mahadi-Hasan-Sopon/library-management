const Error = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center dark:bg-base-100 bg-slate-100">
      <div className="relative text-center">
        <p className="text-xl font-semibold absolute top-12 left-1/2 transform -translate-x-1/2 w-full">
          OOPS! PAGE NOT FOUND
        </p>
        <div className="flex justify-center items-center">
          <span className="block text-[200px] font-black font-montserrat">
            4
          </span>
          <span
            className="block text-[200px] font-black -ms-5 font-montserrat"
            style={{ textShadow: "-8px 0px 0px #fff" }}
          >
            0
          </span>
          <span
            className="block text-[200px] font-black -ms-4 font-montserrat"
            style={{ textShadow: "-8px 0px 0px #fff" }}
          >
            4
          </span>
        </div>
        <p className="w-full text-xl font-medium absolute bottom-16 z-20">
          WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
        </p>
        <button className="btn btn-neutral px-10">Go To HomePage</button>
      </div>
    </div>
  );
};

export default Error;
