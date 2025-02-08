import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FcApproval } from "react-icons/fc";
import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa";

import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const images = [
  {
    src: "./src/assets/images/homeImages/booking/amsterdam.jpg",
    title:
      "🇳🇱 کانال‌ها، دوچرخه، موزه ون گوگ  شهری آرام با معماری زیبا و موزه‌های هنری مشهور.",
    rating: 4.5,
  },
  {
    src: "./src/assets/images/homeImages/booking/dubai.jpg",
    title:
      "🇹🇷 پل ارتباطی دو قاره، مسجد آبی، بازار بزرگ شهری تاریخی با ترکیبی از فرهنگ شرق و غرب.",
    rating: 4.2,
  },
  {
    src: "./src/assets/images/homeImages/booking/frankfurt.jpg",
    title:
      " 🇩🇪 مرکز مالی آلمان، ساختمان‌های مدرن شهری پویا و مدرن با اقتصاد قوی.",
    rating: 4,
  },
  {
    src: "./src/assets/images/homeImages/booking/istanbul.jpg",
    title:
      "🇹🇷 پل ارتباطی دو قاره، مسجد آبی، بازار بزرگ شهری تاریخی با ترکیبی از فرهنگ شرق و غرب.",
    rating: 4.8,
  },
  {
    src: "./src/assets/images/homeImages/booking/moscow.jpg",
    title:
      "🇷🇺 کرملین، میدان سرخ، تاریخ غنی پایتختی با تاریخی کهن و معماری باشکوه.",
    rating: 4.8,
  },
  {
    src: "./src/assets/images/homeImages/booking/new york.jpg",
    title:
      " 🇺🇸 قلب تپنده‌ی جهان، آسمان‌خراش‌ها شهری که هرگز نمی‌خوابد، با جاذبه‌های بی‌نظیر",
    rating: 4.8,
  },
  {
    src: "./src/assets/images/homeImages/booking/paris.jpg",
    title:
      "🇫🇷 شهر عشق، برج ایفل، موزه لوور شهری رمانتیک با موزه‌های جهانی و مد روز دنیا.",
    rating: 4.8,
  },
  {
    src: "./src/assets/images/homeImages/booking/seul.jpg",
    title:
      "🇰🇷 پایتخت فناوری، کاخ گگبوک شهری مدرن با تلفیقی از سنت و مدرنیته و جاذبه‌های جذاب",
    rating: 4.8,
  },
  {
    src: "./src/assets/images/homeImages/booking/toronto.jpg",
    title:
      "🇨🇦 نگین کانادا، برج سی‌ان، چندفرهنگی شهری مدرن با فرهنگ غنی و جاذبه‌های گردشگری متنوع.",
    rating: 4.8,
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

const SuggestionsForeign = () => {
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
                  loading="lazy"
                  className="w-full h-64 object-cover transform transition-transform
                   duration-300 group-hover:scale-105 group-hover:-translate-y-2"
                />

                <div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-t
                 from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-between"
                >
                  <div className="flex justify-between bg-opacity-50 bg-black p-1 rounded-md text-xs">
                    <h2 className="text-white text-lg font-bold">
                      {image.title}
                    </h2>
                    <StarRating rating={image.rating} />
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between">
                      <button
                        className="text-[10px] hover:bg-slate-200 px-3 p-1 flex items-center gap-2 bg-slate-100 rounded-md
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

export default SuggestionsForeign;
