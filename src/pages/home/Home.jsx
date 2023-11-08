import { useQuery } from "@tanstack/react-query";
import "./Home.css";
import useApi from "../../api/Api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../../components/footer/Footer";

function Home() {
  const api = useApi();

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  });

  const bestSellingBooks = useQuery({
    queryKey: ["bestSellers"],
    queryFn: api.getBestSellingBooks,
  });

  if (categories.isLoading) return <LoadingSpinner />;
  if (bestSellingBooks.isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="banner-with-swiper">
        <Swiper>
          <SwiperSlide>
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
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="category-container py-14 md:py-20">
        <h1 className="text-4xl font-bold mb-10">Categories: </h1>
        <div className="categories grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {categories.data?.map((category) => (
            <Link
              className="h-min"
              to={`/books/${category.category}`}
              key={category._id}
            >
              <img className="w-full h-96" src={category.image} alt="" />
              <h2 className="text-2xl font-bold text-center mt-3">
                {category.category}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="carousel-with-swiper my-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="item1">
              <div className="image xl:rounded-lg rounded-s-none flex justify-start px-10 py-24 w-full h-full">
                <div className="content w-full min-h-[40vh]"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item2">
              <div className="image2 xl:rounded-lg rounded-s-none flex justify-start px-10 py-24 w-full">
                <div className="content w-full min-h-[40vh]"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item3">
              <div className="image3 xl:rounded-lg rounded-s-none flex justify-start px-10 py-24 w-full">
                <div className="content w-full min-h-[40vh]"></div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="best-seller py-14 md:py-20">
        <h1 className="text-4xl font-bold mb-10">Best Sellers: </h1>
        <div className="books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellingBooks.data?.map((book) => (
            <div className="flex flex-col h-min" key={book._id}>
              <Link
                className="block mb-6 w-full h-full"
                to={`/bookDetails/${book._id}`}
              >
                <img
                  className="w-full h-96"
                  src={book.image?.cover}
                  alt={book.title}
                />
                <h2 className="text-xl font-medium text-center mt-3">
                  {book.title}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer/ >
    </div>
  );
}

export default Home;
