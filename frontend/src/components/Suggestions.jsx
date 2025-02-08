import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FcApproval } from "react-icons/fc";
import PropTypes from "prop-types";
import { FaArrowLeft, FaHotel } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const images = [
  {
    src: "./src/assets/images/homeImages/slider/Isfahan.jpg",
    title: "اصفهان؛ موزه زنده ایران",
    rating: 4.5,
    hotel: 35,
    house: 48,
  },
  {
    src: "./src/assets/images/homeImages/slider/Kashan.jpg",
    title: "کاشان؛ نگین کویر ایران",
    rating: 4.2,
    hotel: 20,
    house: 48,
  },
  {
    src: "./src/assets/images/homeImages/slider/Kerman.jpg",
    title: " کرمان؛ شهری با هزار و یک راز",
    rating: 4,
    hotel: 20,
    house: 48,
  },
  {
    src: "./src/assets/images/homeImages/slider/Mashhad.jpg",
    title: "مشهد؛ مقصدی برای هر فصل از سال",
    rating: 4.8,
    hotel: 20,
    house: 15,
  },
  {
    src: "./src/assets/images/homeImages/slider/masuleh.jpg",
    title: "ماسوله؛ نگین گیلان",
    rating: 4.8,
    hotel: 20,
    house: 15,
  },
  {
    src: "./src/assets/images/homeImages/slider/Shiraz.jpg",
    title: "شیراز؛ شهر عشق و دلدادگی",
    rating: 4.8,
    hotel: 20,
    house: 15,
  },
];

const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <span
        key={i}
        className={`text-yellow-400 ${
          i < Math.floor(rating) ? "opacity-100" : "opacity-50"
        }`}
      >
        ★
      </span>
    ));
  return <div className="flex">{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const Suggestions = () => {
  return (
    <div className="px-24 pb-10 mb-20">
      <h1 className="text-black text-lg font-bold flex items-center gap-2 mb-10">
        <FcApproval />
        پیشنهاد ها
      </h1>
      <div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transform transition-transform
                   duration-300 group-hover:scale-105 group-hover:-translate-y-2"
                />

                <div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-t
                 from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-between"
                >
                  <div className="flex justify-between">
                    <h2 className="text-white text-xl font-bold">
                      {image.title}
                    </h2>
                    <StarRating rating={image.rating} />
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaHotel />
                          {image.hotel}
                          <span>هتل</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaHouse />
                          {image.house}
                          <span>اقامتگاه</span>
                        </div>
                      </div>
                      <button
                        className="text-[10px] hover:bg-slate-200 px-3 flex items-center gap-2 bg-slate-100 rounded-md
                       text-black"
                      >
                        اطلاعات بیشتر
                        <FaArrowLeft />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Suggestions;
