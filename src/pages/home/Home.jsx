import { useQuery } from "@tanstack/react-query";
import "./Home.css";
import { getCategories } from "../../api/Api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

function Home() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // const bestSellingBooks = useQuery({queryKey: ["bestSellers"], queryFn: })

  if (categories.isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="banner">
        <div className="content p-20 ">
          <div className="min-h-[50vh] flex justify-center items-center flex-col">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-slate-200 dark:text-slate-400">
              Access To Thousands of Free Ebooks
            </h1>
            <h1 className="mb-5 text-4xl font-bold text-slate-200 dark:text-slate-400">
              Borrow or Read Online
            </h1>
            <button className="btn btn-primary dark:text-gray-100">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="category-container py-14 md:py-20">
        <h1 className="text-4xl font-bold mb-10">Categories: </h1>
        <div className="categories grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {categories.data?.map((category) => (
            <Link to={`/allBook/${category.category}`} key={category._id}>
              <img
                className="w-full h-full max-h-96"
                src={category.image}
                alt=""
              />
              <h2 className="text-2xl font-bold text-center mt-3">
                {category.category}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="carousel-container mb-10">
        <Carousel autoPlay infiniteLoop showThumbs={false} className="w-full">
          <div className="item1">
            <div className="image xl:rounded-lg rounded-s-none flex justify-start px-10 py-24 w-full h-full">
              <div className="content w-full min-h-[40vh]"></div>
            </div>
          </div>
          <div className="item2">
            <div className="image2 xl:rounded-lg rounded-s-none flex justify-start px-10 py-24 w-full">
              <div className="content w-full min-h-[40vh]"></div>
            </div>
          </div>
          <div className="item3">
            <div className="image3 xl:rounded-lg rounded-s-none flex justify-start px-10 py-24 w-full">
              <div className="content w-full min-h-[40vh]"></div>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="best-seller">
        <div className="books"></div>
      </div>
    </div>
  );
}

export default Home;
