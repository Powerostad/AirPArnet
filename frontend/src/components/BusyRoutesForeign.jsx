import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AiOutlineInteraction } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { IoSparkles } from "react-icons/io5";

const popularRoutes = [
  {
    from: "تهران",
    to: "فرانکفورت",
    departure: "1402/11/15",
    return: "1402/11/20",
    price: "۱7,۵۰۰,۰۰۰",
  },
  {
    from: "تهران",
    to: "دبی",
    departure: "1402/11/18",
    return: "1402/11/25",
    price: "۱6,۲۰۰,۰۰۰",
  },
  {
    from: "تهران",
    to: "آنکارا",
    departure: "1402/12/05",
    return: "1402/12/10",
    price: "۱4,۷۵۰,۰۰۰",
  },
  {
    from: "تهران",
    to: "تورنتو",
    departure: "1402/12/12",
    return: "1402/12/18",
    price: "12,۹۵۰,۰۰۰",
  },
  {
    from: "تهران",
    to: "نیویورک",
    departure: "1402/11/15",
    return: "1402/11/20",
    price: "۱3,۵۰۰,۰۰۰",
  },
  {
    from: "تهران",
    to: "استانبول",
    departure: "1402/12/12",
    return: "1402/12/18",
    price: "14,۹۵۰,۰۰۰",
  },
];

const BusyRoutesForeign = () => {
  return (
    <>
      <IoSparkles
        size={70}
        className="text-opacity-20 text-[gold] left-20 absolute"
      />
      <div className="container mb-20 px-24">
        <h2 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
          <AiOutlineInteraction size={20} />
          مسیرهای پرتردد
        </h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {popularRoutes.map((route, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-lg p-5 border flex flex-col gap-5 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {route.from} ← {route.to}
                </h3>
                <div className="flex gap-3 text-xs bg-indigo-100 text-[#9333ea] p-2 rounded-md justify-center">
                  <SlCalender />
                  {route.departure} - {route.return}
                </div>
                <p className="text-xs text-gray-700 mt-3 leading-7">
                  شروع قیمت از
                  <br />
                  <span className="text-sm font-bold">{route.price} تومان</span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BusyRoutesForeign;
