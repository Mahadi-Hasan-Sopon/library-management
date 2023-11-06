import "./Home.css";

function Home() {
  return (
    <div>
      <div className="banner">
        <div
          className="hero min-h-[70vh]"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/8jBv5xn/62c562f5bfcd62-92139011.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl font-bold">
                Access To Thousands of Free Ebooks
              </h1>
              <h1 className="mb-5 text-4xl font-bold">Borrow or Read Online</h1>
              <button className="btn btn-warning text-white dark:text-gray-100 dark:bg-yellow-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
