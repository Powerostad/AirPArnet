import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Header from "../components/Header";
import { Pagination } from "swiper/modules";
import Footer from "../components/Footer";

const images = [
  {
    src: "./src/assets/images/about-us/top/1.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/2.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/3.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/3.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/4.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/5.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/1.jpg",
  },
  {
    src: "./src/assets/images/about-us/top/6.jpg",
  },
];
const images2 = [
  {
    src: "./src/assets/images/about-us/1.jpg",
  },
  {
    src: "./src/assets/images/about-us/2.jpg",
  },
  {
    src: "./src/assets/images/about-us/3.jpg",
  },
  {
    src: "./src/assets/images/about-us/3.jpg",
  },
  {
    src: "./src/assets/images/about-us/4.jpg",
  },
  {
    src: "./src/assets/images/about-us/5.jpg",
  },
  {
    src: "./src/assets/images/about-us/1.jpg",
  },
  {
    src: "./src/assets/images/about-us/6.jpg",
  },
];
const About = () => {
  return (
    <div className="relative">
      <Header />
      <div className="pb-20 flex justify-center">
        <div
          className="w-full h-[350px] bg-gradient-to-tr from-[gold] to-[#9333ea]
         rounded-b-[3rem]"
        ></div>
        <div
          className="bg-white shadow-md border w-2/3 p-5 py-10 rounded-md
       absolute top-[190px] flex justify-center gap-5 flex-col text-center"
        >
          <h1 className="text-2xl text-black font-bold">
            درباره پرنت; ما کی هستیم؟
          </h1>
          <p className="text-gray-700">
            سامانه حمل نقل داخلی و خارجی , هوایی و زمینی
          </p>
          <p className="text-gray-700">پرنت; همراه همیشگی سفرهای شما.</p>
        </div>
      </div>
      {/* slider  */}
      <div className="px-24 mb-20">
        <Swiper
          modules={([Pagination], [Autoplay])}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-56 object-cover transform transition-transform
                   duration-300 group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* section1  */}
      <div className="px-40 mb-20 flex flex-col gap-10 text-center justify-center text-black text-lg">
        <p className="leading-loose border rounded-md p-3 border-slate-400">
          پرنت، پل ارتباطی شما با جهان است. ما با ارائه طیف گسترده‌ای از خدمات
          رزرواسیون آنلاین، از جمله بلیت‌های هواپیما، قطار، اتوبوس و رزرو هتل،
          تلاش می‌کنیم تا سفرهای شما را آسان‌تر و لذت‌بخش‌تر کنیم. هدف ما این
          است که با ارائه بهترین قیمت‌ها، پشتیبانی 24 ساعته و رابط کاربری ساده،
          تجربه سفر بی‌نظیری را برای شما فراهم کنیم. با پرنت، رزرو بلیت و
          برنامه‌ریزی سفر تنها با چند کلیک امکان‌پ پذیر است.
        </p>
        <p className="leading-loose border rounded-md p-3 border-slate-400">
          پرنت، یک پلتفرم جامع برای رزرو آنلاین انواع بلیت و خدمات سفر است. ما
          با همکاری معتبرترین شرکت‌های هواپیمایی، ریلی و گردشگری، طیف وسیعی از
          گزینه‌ها را در اختیار شما قرار می‌دهیم. تیم متخصص ما با سال‌ها تجربه
          در صنعت گردشگری، به شما کمک می‌کند تا بهترین انتخاب را داشته باشید. از
          رزرو بلیت‌های لحظه آخری گرفته تا برنامه‌ریزی سفرهای گروهی، پرنت تمامی
          نیازهای شما را برطرف خواهد کرد.
        </p>
      </div>
      {/* section 2  */}
      <div className="px-40 mb-20">
        <h1 className="text-lg font-bold text-center text-black mb-5">
          هدف های ما
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <div
            className="text-gray-700 text-sm bg-white border
           border-slate-400 text-center rounded-md p-5"
          >
            ما به قدرت همکاری و تیمی بودن اعتقاد داریم.
          </div>
          <div
            className="text-gray-700 text-sm bg-white border
           border-slate-400 text-center rounded-md p-5"
          >
            مشتری مداری، هسته اصلی کسب‌وکار ما است.
          </div>
          <div
            className="text-gray-700 text-sm bg-white border
           border-slate-400 text-center rounded-md p-5"
          >
            نوآوری و خلاقیت، موتور محرک رشد ما هستند.
          </div>
          <div
            className="text-gray-700 text-sm bg-white border
           border-slate-400 text-center rounded-md p-5"
          >
            صداقت و شفافیت، اساس روابط ما با همکاران و مشتریان است.
          </div>
          <div
            className="text-gray-700 text-sm bg-white border
           border-slate-400 text-center rounded-md p-5"
          >
            مسئولیت‌پذیری اجتماعی، بخشی جدایی‌ناپذیر از فرهنگ ما است.
          </div>
          <div
            className="text-gray-700 text-sm bg-white border
           border-slate-400 text-center rounded-md p-5"
          >
            کیفیت، تعهد ما به مشتریان است.
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div>
        <h1 className="text-lg font-bold text-center text-black mb-5">
          محل کاری پرنت
        </h1>
        <div className="px-24 mb-20">
          <Swiper
            modules={([Pagination], [Autoplay])}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="w-full"
          >
            {images2.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-56 object-cover transform transition-transform
                   duration-300 group-hover:scale-105 group-hover:-translate-y-2"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default About;
