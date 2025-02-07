import { useState } from "react";
import { IoMdAirplane } from "react-icons/io";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const FirstPartForeign = () => {
  const startCity = [
    "آنکارا , ترکیه ",
    "تورنتو  , کانادا",
    "ازمیر , ترکیه ",
    "استانبول , ترکیه ",
    "ایروان  , ارمنستان",
    "دبی  , امارات",
    "فرانکفورت  , آلمان",
    "لندن  , انگلیس",
    "میلان  , ایتالیا",
  ];
  const endCity = [
    "آنکارا , ترکیه ",
    "تورنتو  , کانادا",
    "ازمیر , ترکیه ",
    "استانبول , ترکیه ",
    "ایروان  , ارمنستان",
    "دبی  , امارات",
    "فرانکفورت  , آلمان",
    "لندن  , انگلیس",
    "میلان  , ایتالیا",
  ];

  const [searchStart, setSearchTerm] = useState("");
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [selectedStart, setSelectedStart] = useState("");

  const [searchEnd, setSearchEnd] = useState("");
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [selectedEnd, setSelectedEnd] = useState("");

  const filteredStart = startCity.filter((option) =>
    option.toLowerCase().includes(searchStart.toLowerCase())
  );
  const filteredEnd = endCity.filter((option) =>
    option.toLowerCase().includes(searchEnd.toLowerCase())
  );

  const [tripType, setTripType] = useState("یک طرفه");

  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState({
    adult: "",
    child: "",
    baby: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      tripType,
      flightType: "international",
      selectedStart,
      selectedEnd,
      departDate: departDate || "",
      returnDate: tripType === "یک طرفه" ? "" : returnDate || "",
      adult: passengers.adult,
      child: passengers.child,
      baby: passengers.baby,
    }).toString();

    navigate(`/search?${queryParams}`);
  };

  return (
    <div className="z-40  w-full flex flex-col gap-4 px-24 absolute top-[210px]">
      <div className="backdrop-blur-md p-5 rounded-full bg-opacity-20 bg-white flex gap-8">
        <Link to={"/"}>
          <div
            className=" text-gray-700 bg-white border-4  border-gray-300
        flex cursor-pointer items-center gap-2 rounded-full p-2 px-5"
          >
            <IoMdAirplane />
            پرواز داخلی
          </div>
        </Link>
        <Link to={"/foreign"}>
          <div
            className="text-black border-4 border-[gold]   bg-white flex gap-2 
         cursor-pointer items-center rounded-full p-2 px-5"
          >
            <IoMdAirplane className="text-[gold]" />
            پرواز خارجی
          </div>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white pb-10 p-6 rounded-lg flex flex-col gap-14 shadow-md"
      >
        <select
          className="py-1 px-2 text-xs rounded-full border-gray-300 border-2 text-black
    focus:border-[gold] w-fit bg-white max-w-xs"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
        >
          <option value="یک طرفه">یک طرفه</option>
          <option value="دو طرفه">دو طرفه</option>
        </select>
        <div className="flex gap-2">
          <div className="relative w-1/6">
            <input
              type="text"
              value={selectedStart}
              onChange={(e) => setSelectedStart(e.target.value)}
              onFocus={() => setIsOpenStart(true)}
              onBlur={() => setTimeout(() => setIsOpenStart(false), 100)}
              className="w-full p-2 cursor-pointer border-gray-300 border-2 placeholder:text-gray-500 text-gray-500
             bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
              placeholder="مبدا (شهر , فرودگاه)"
            />

            {isOpenStart && (
              <ul
                className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border
               border-gray-300 rounded-md shadow-lg"
              >
                {filteredStart.length > 0 ? (
                  filteredStart.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedStart(option);
                        setSearchTerm(option);
                        setIsOpenStart(false);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">نتیجه‌ای پیدا نشد</li>
                )}
              </ul>
            )}
          </div>
          <div className="relative w-1/6">
            <input
              type="text"
              value={selectedEnd}
              onChange={(e) => setSelectedEnd(e.target.value)}
              onFocus={() => setIsOpenEnd(true)}
              onBlur={() => setTimeout(() => setIsOpenEnd(false), 100)}
              className="w-full p-2 cursor-pointer border-gray-300 border-2 placeholder:text-gray-500 text-gray-500
             bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
              placeholder="مقصد (شهر , فرودگاه)"
            />

            {isOpenEnd && (
              <ul
                className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border
               border-gray-300 rounded-md shadow-lg"
              >
                {filteredEnd.length > 0 ? (
                  filteredEnd.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedEnd(option);
                        setSearchEnd(option);
                        setIsOpenEnd(false);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">نتیجه‌ای پیدا نشد</li>
                )}
              </ul>
            )}
          </div>
          <div>
            <div style={{ direction: "rtl" }}>
              <DatePicker
                style={{
                  backgroundColor: "white",
                  borderWidth: "2px",
                  borderColor: "#d1d5db",
                  height: "24px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  padding: "20px 15px",
                }}
                placeholder="تاریخ رفت"
                calendar={persian}
                locale={persian_fa}
                onChange={setDepartDate}
                calendarPosition="bottom-right"
              />
            </div>
          </div>
          <div style={{ direction: "rtl" }}>
            <DatePicker
              style={{
                backgroundColor: tripType === "یک طرفه" ? "#e5e7eb" : "white",
                borderWidth: "2px",
                borderColor: "#d1d5db",
                height: "24px",
                borderRadius: "9999px",
                fontSize: "14px",
                padding: "20px 15px",
                cursor: tripType === "یک طرفه" ? "not-allowed" : "pointer",
              }}
              placeholder="تاریخ برگشت"
              calendar={persian}
              locale={persian_fa}
              onChange={setReturnDate}
              disabled={tripType === "یک طرفه"}
              calendarPosition="bottom-right"
            />
          </div>
          <div className="relative flex items-center gap-2">
            <h1 className="text-xs whitespace-nowrap text-gray-600">
              تعداد مسافران:
            </h1>

            <input
              type="text"
              placeholder="بزرگسال"
              value={passengers.adult}
              onChange={(e) =>
                setPassengers({ ...passengers, adult: e.target.value })
              }
              className="w-full p-2 cursor-pointer border-gray-300 border-2 placeholder:text-gray-500 text-gray-500
               bg-white rounded-full focus:outline-none
              focus:ring-2 focus:ring-[gold]"
            />
            <input
              type="text"
              placeholder="کودک"
              value={passengers.child}
              onChange={(e) =>
                setPassengers({ ...passengers, child: e.target.value })
              }
              className="w-full p-2 cursor-pointer border-gray-300 border-2 placeholder:text-gray-500 text-gray-500
               bg-white rounded-full focus:outline-none
              focus:ring-2 focus:ring-[gold]"
            />
            <input
              type="text"
              placeholder="نوزاد"
              value={passengers.baby}
              onChange={(e) =>
                setPassengers({ ...passengers, baby: e.target.value })
              }
              className="w-full p-2 cursor-pointer border-gray-300 border-2 placeholder:text-gray-500 text-gray-500
               bg-white rounded-full focus:outline-none
              focus:ring-2 focus:ring-[gold]"
            />
          </div>
          <button
            type="submit"
            className="bg-[gold] py-1 px-4 w-1/6 text-center text-black rounded-full
           flex gap-2 items-center justify-center text-xs"
          >
            جستجو
            <IoSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirstPartForeign;
