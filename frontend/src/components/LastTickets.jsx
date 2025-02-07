import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlaneDeparture } from "react-icons/fa"; // آیکون هواپیما
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { SlCalender } from "react-icons/sl";
import { LuTicket } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";

const lastTickets = [
  {
    id: 1,
    date: "۱۴۰۲/۱۱/۱۵",
    day: "یکشنبه",
    destination: "تهران",
    icon: <FaPlaneDeparture />,
  },
  {
    id: 2,
    date: "۱۴۰۲/۱۱/۱۴",
    day: "شنبه",
    destination: "مشهد",
    icon: <FaPlaneDeparture />,
  },
  {
    id: 3,
    date: "۱۴۰۲/۱۱/۱۳",
    day: "جمعه",
    destination: "اصفهان",
    icon: <FaPlaneDeparture />,
  },
  {
    id: 4,
    date: "۱۴۰۲/۱۱/۱۲",
    day: "پنجشنبه",
    destination: "شیراز",
    icon: <FaPlaneDeparture />,
  },
];

export default function LastTickets() {
  return (
    <div className="w-full max-w-lg mx-auto mb-20">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex gap-2 items-center">
        <LuTicket />
        آخرین بلیط‌ها
      </h2>
      <Swiper
        direction="vertical"
        slidesPerView={3}
        spaceBetween={15}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[ Autoplay]}
        className="h-[300px]"
      >
        {lastTickets.map((ticket) => (
          <SwiperSlide key={ticket.id}>
            <div
              className="flex items-center text-black gap-4 p-4 border rounded-lg bg-slate-100
             shadow-md transition duration-300 hover:bg-purple-500 hover:text-white"
            >
              <div className="text-purple-600 text-xl hover:text-white">
                {ticket.icon}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold flex items-center gap-2">
                  <SlCalender />
                  {ticket.date}
                </span>
                <span className="text-xs opacity-70">{ticket.day}</span>
              </div>
              <span className="mr-11 font-semibold flex items-center gap-2">
                <FaLocationDot />
                {ticket.destination}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
