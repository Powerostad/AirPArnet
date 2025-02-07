import { FaLocationDot, FaPerson } from "react-icons/fa6";
import { IoMdAirplane } from "react-icons/io";
import { IoSparkles } from "react-icons/io5";

const Stat = () => {
  return (
    <div className="w-full bg-gray-100 px-24 py-5 mb-20">
      <div className="stats shadow w-full bg-white text-[gold]">
        <div className="stat">
          <div className="stat-figure text-gray-400">
            <FaPerson size={40} />
          </div>
          <div className="stat-value">600K</div>
          <div className="stat-title text-gray-600 text-sm">
            مسافران جابه جا شده
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-gray-400">
            <FaLocationDot size={40} />
          </div>
          <div className="stat-value">+50K</div>
          <div className="stat-title text-gray-600 text-sm">
            مقاصد پوشش داده شده
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-gray-400">
            <IoSparkles size={40} />
          </div>
          <div className="stat-value">+4.8</div>
          <div className="stat-title text-gray-600 text-sm">
            میانگین نمره رضایت مشتری
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-gray-400">
            <IoMdAirplane size={40} />
          </div>
          <div className="stat-value">+180</div>
          <div className="stat-title text-gray-600 text-sm">
            تعداد پروازهای روزانه
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
