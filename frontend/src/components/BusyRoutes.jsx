import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AiOutlineInteraction } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";

const popularRoutes = [
  {
    src: "./src/assets/images/homeImages/slider2/kish.jpg",
    from: "جزیره کیش",
    to: "تهران",
    departure: "1402/11/15",
    return: "1402/11/20",
    price: "۱,۵۰۰,۰۰۰",
  },
  {
    src: "./src/assets/images/homeImages/slider2/mashhad.jpg",
    from: "مشهد",
    to: "تهران",
    departure: "1402/11/18",
    return: "1402/11/25",
    price: "۱,۲۰۰,۰۰۰",
  },
  {
    src: "./src/assets/images/homeImages/slider2/ahvaz.jpg",
    from: "اهواز",
    to: "تهران",
    departure: "1402/12/05",
    return: "1402/12/10",
    price: "۱,۷۵۰,۰۰۰",
  },
  {
    src: "./src/assets/images/homeImages/slider2/shiraz.jpg",
    from: "شیراز",
    to: "تهران",
    departure: "1402/12/12",
    return: "1402/12/18",
    price: "۹۵۰,۰۰۰",
  },
  {
    src: "./src/assets/images/homeImages/slider2/kish.jpg",
    from: "جزیره کیش",
    to: "تهران",
    departure: "1402/11/15",
    return: "1402/11/20",
    price: "۱,۵۰۰,۰۰۰",
  },
  {
    src: "./src/assets/images/homeImages/slider2/shiraz.jpg",
    from: "شیراز",
    to: "تهران",
    departure: "1402/12/12",
    return: "1402/12/18",
    price: "۹۵۰,۰۰۰",
  },
];

const BusyRoutes = () => {
  return (
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
              <img
                src={route.src}
                className="w-full h-64 object-cover rounded-md"
              />
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
  );
};

export default BusyRoutes;
