const LoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center 
    w-screen h-screen fixed bg-white dark:bg-slate-900 top-0 left-0 right-0 bottom-0"
    >
      <div className="animate-spin rounded-full h-36 w-36 border-t-4 border-b-4 border-orange-600"></div>
    </div>
  );
};

export default LoadingSpinner;
