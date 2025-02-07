import { CiStar } from "react-icons/ci";
import { DiChrome } from "react-icons/di";
import { FaApple, FaUser } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

const SectionTwo = () => {
  return (
    <div className="px-32 flex flex-col gap-4 mb-36">
      <div className="flex gap-40">
        <img
          src="./src/assets/images/homeImages/app2.png"
          className="w-96"
        ></img>
        <div className="pt-5 flex flex-col gap-5 border-b-2">
          <h1 className="text-2xl text-black font-bold">
            برنامه پرنت رو دانلود کن
          </h1>
          <p className="text-xl text-[gold]">سفرت رو راحت‌تر کن</p>
          <p className="text-gray-700 mb-10">
            با اپلیکیشن پرنت، بلیط، هتل و هرچیزی که برای سفر نیاز داری رو با چند
            تا لمس رزرو کن.
            <br />
            از تخفیف‌های ویژه لذت ببر و سفرت رو هوشمندانه برنامه‌ریزی کن. همین
            حالا دانلود کن!
          </p>
          <div className="flex gap-10 p-5">
            <div className="grid grid-cols-2 p-5 gap-3 text-xs h-32 w-4/5">
              <div
                className="bg-black text-white gap-2 rounded-md px-2 flex justify-center
               items-center"
              >
                <IoLogoAndroid size={20} />
                دانلود نسخه اندروید
              </div>
              <div
                className="bg-black text-white rounded-md gap-2 px-2 flex justify-center
               items-center"
              >
                <FaApple size={20} />
                دانلود اپل
              </div>
              <div
                className="bg-black text-white rounded-md gap-2 px-2 flex justify-center
               items-center"
              >
                <MdOutlineFileDownload size={20} />
                دانلود مستقیم
              </div>
              <div
                className="bg-black text-white rounded-md gap-2 px-2 flex justify-center
               items-center"
              >
                <DiChrome size={20} />
                وب اپلیکیشن
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="./src/assets/images/homeImages/qr.png"
                className="w-36"
              />
              <p className="text-[12px] text-gray-600">
                اسکن کنید و دانلود کنید!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" py-10 flex gap-5 justify-around">
        <div className="flex gap-5">
          <FaUser className="text-[#9333ea]" size={30} />
          <p className="leading-loose text-gray-700">
            بیش از <br />{" "}
            <span className="font-bold text-black text-xl"> 1,100,000 </span>{" "}
            <br /> کاربر فعال
          </p>
        </div>

        <div className="flex gap-5">
          <CiStar className="text-[#9333ea]" size={35} />
          <p className="leading-loose text-gray-700">
            بیش از <br />{" "}
            <span className="font-bold text-black text-xl"> 94% </span>{" "}
            <br /> رضایت کاربران
          </p>
        </div>

        <div className="flex gap-5">
          <IoBag className="text-[#9333ea]" size={35} />
          <p className="leading-loose text-gray-700">
            بیش از <br />{" "}
            <span className="font-bold text-black text-xl"> 7,000,000 </span>{" "}
            <br /> سفارش موفق محصولات گردشگری
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
