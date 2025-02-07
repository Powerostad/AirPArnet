import { CiLinkedin } from "react-icons/ci";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="border-t-2 bg-white border-[#9333ea] p-10 px-24">
        {/* first part  */}
        <div className="flex justify-between pb-10 border-b-2 border-slate-200">
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-black">
              بهترین پیشنهادها، مستقیم در ایمیل شما
            </h3>
            <p className="text-gray-700 leading-8">
              با ثبت‌نام در خبرنامه، از جدیدترین پیشنهادهای پروازی، <br />{" "}
              تخفیفات ویژه و رویدادهای جذاب مطلع شوید.
            </p>
          </div>
          <div className="flex">
            <input
              type="email"
              className="bg-white border border-gray-300 
            h-12 rounded-r-md p-2 w-full placeholder-slate-600"
              placeholder="ایمیل شما"
            />
            <button className="bg-white border-b border-t border-l border-gray-300 h-12 px-4 text-slate-600 rounded-l-md">
              ثبت
            </button>
          </div>
        </div>
        {/* second part  */}
        <div className="pt-10 pb-1 flex gap-56">
          <div className="flex flex-col gap-5">
            <div className="flex gap-1 items-center">
              <img src="logo.png" className="size-10"></img>
              <a className="btn btn-ghost text-3xl font-bold text-black">
                پرنت
              </a>
            </div>
            <p className="leading-7 text-sm text-gray-700">
              تلفن‌ :‌ 021-12340000 <br />
              آدرس : میدان انقلاب، خیابان ولیعصر کوچه نایبی موسسه آموزش عالی
              دماوند
            </p>
            <div className="flex gap-2 h-28 mt-5">
              <img
                src="./src/assets/images/homeImages/badges/enamad.jpg"
                className="bg-white border rounded-md border-slate-200 p-2 w-16 h-20 object-cover"
              />
              <img
                src="./src/assets/images/homeImages/badges/kasbokar.jpg"
                className="bg-white border rounded-md border-slate-200 p-2 w-16 h-20  object-cover"
              />
              <img
                src="./src/assets/images/homeImages/badges/rezi.jpg"
                className="bg-white border rounded-md border-slate-200 p-2 w-16 h-20  object-cover"
              />
            </div>
          </div>
          {/* left  */}
          <div className="flex gap-32 text-sm text-black">
            <ul className="flex flex-col gap-5">
              <li className="font-bold mb-3">پرنت</li>
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>چرا پرنت</li>
              <li>پرنت پلاس</li>
            </ul>
            <ul className="flex flex-col gap-5">
              <li className="font-bold mb-3 ">خدمات مشتریان</li>
              <li>مرکز پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>قوانین و مقررات</li>
              <li>پرسش و پاسخ</li>
            </ul>
            <ul className="flex flex-col gap-5">
              <li className="font-bold mb-3">اطلاعات تکمیلی</li>
              <li>فروش سازمانی</li>
              <li>همکاری با آژانس ها</li>
              <li>فرصت های شغلی</li>
              <li>سنجش رضایتمندی</li>
            </ul>
          </div>
        </div>
      </div>
      {/* third part  */}
      <div className="bg-gray-200 flex justify-between px-24 py-5">
        <p className="text-gray-500 text-xs">
          هرگونه استفاده از این موارد بدون مجوز کتبی و صریح از شرکت پرنت ، نقض
          حقوق مالکیت معنوی محسوب شده و پیگرد قانونی خواهد داشت.
        </p>
        <div className="flex gap-5 items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={22}
            height={22}
          >
            <path
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 
318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
            />
          </svg>
          <CiLinkedin color="black" size={27} />
          <FaInstagram color="black" size={25} />
          <FaYoutube color="black" size={25} />
          <FaTelegramPlane color="black" size={25} />
        </div>
      </div>
      {/* <div className="absolute bottom-0 z-10">
        <svg
          id="visual"
          viewBox="0 0 900 600"
          width="1518"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
        >
          <path
            className="path-first"
            d="M0 328L75 357.8C150 387.7 300 447.3 450 438.3C600 429.3 750 351.7
             825 312.8L900 274L900 601L825 601C750 601 600 601 450 601C300 601 150 601 75 601L0 601Z"
            fill="#f7f8f9"
          ></path>
          <path
            className="path-second"
            d="M0 510L75 507.3C150 504.7 300 499.3 450 496.8C600 494.3 750 494.7
             825 494.8L900 495L900 601L825 601C750 601 600 601 450 601C300 601 150 601 75 601L0 601Z"
            fill="#e0e3e9"
          ></path>
        </svg>
      </div> */}
    </>
  );
};

export default Footer;
