const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen absolute bg-white dark:bg-slate-900 top-0 left-0">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary-orange"></div>
    </div>
  );
};

export default LoadingSpinner;
