import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();

  // State for trip details
  const [tripType, setTripType] = useState("یک طرفه");
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState({
    adult: "",
    child: "",
    baby: "",
  });

  // City options
  const cityOptions = [
    "تهران",
    "اهواز",
    "شیراز",
    "مشهد",
    "بندر عباس",
    "اصفهان",
    "تبریز",
    "کیش",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct query parameters
    const searchParams = new URLSearchParams({
      tripType,
      selectedStart,
      selectedEnd,
      departDate: departDate ? departDate.format() : "",
      returnDate:
        tripType === "یک طرفه" ? "" : returnDate ? returnDate.format() : "",
      adult: passengers.adult,
      child: passengers.child,
      baby: passengers.baby,
    });

    // Navigate to Search page with query parameters
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="z-40 w-full flex flex-col gap-4 px-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white pb-10 p-6 rounded-lg flex flex-col gap-14 shadow-md"
      >
        <select
          className="py-1 px-2 text-xs rounded-full border-gray-300 border-2 text-black focus:border-[gold] w-fit bg-white max-w-xs"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
        >
          <option value="یک طرفه">یک طرفه</option>
          <option value="دو طرفه">دو طرفه</option>
        </select>

        <div className="flex gap-2">
          {/* Start City Selection */}
          <div className="relative w-1/6">
            <select
              value={selectedStart}
              onChange={(e) => setSelectedStart(e.target.value)}
              className="w-full p-2 border-gray-300 border-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
            >
              <option value="">مبدا (شهر)</option>
              {cityOptions.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* End City Selection */}
          <div className="relative w-1/6">
            <select
              value={selectedEnd}
              onChange={(e) => setSelectedEnd(e.target.value)}
              className="w-full p-2 border-gray-300 border-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
            >
              <option value="">مقصد (شهر)</option>
              {cityOptions.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Departure Date */}
          <div style={{ direction: "rtl" }}>
            <DatePicker
              style={{
                backgroundColor: "white",
                borderWidth: "2px",
                borderColor: "#d1d5db",
                height: "40px",
                borderRadius: "9999px",
                fontSize: "14px",
                padding: "10px 15px",
              }}
              placeholder="تاریخ رفت"
              calendar={persian}
              locale={persian_fa}
              value={departDate}
              onChange={setDepartDate}
              calendarPosition="bottom-right"
            />
          </div>

          {/* Return Date */}
          <div style={{ direction: "rtl" }}>
            <DatePicker
              style={{
                backgroundColor: tripType === "یک طرفه" ? "#e5e7eb" : "white",
                borderWidth: "2px",
                borderColor: "#d1d5db",
                height: "40px",
                borderRadius: "9999px",
                fontSize: "14px",
                padding: "10px 15px",
                cursor: tripType === "یک طرفه" ? "not-allowed" : "pointer",
              }}
              placeholder="تاریخ برگشت"
              calendar={persian}
              locale={persian_fa}
              disabled={tripType === "یک طرفه"}
              value={returnDate}
              onChange={setReturnDate}
              calendarPosition="bottom-right"
            />
          </div>

          {/* Passengers */}
          <div className="flex items-center gap-2">
            <h1 className="text-xs whitespace-nowrap text-gray-600">
              تعداد مسافران:
            </h1>
            <input
              type="number"
              placeholder="بزرگسال"
              value={passengers.adult}
              onChange={(e) =>
                setPassengers({ ...passengers, adult: e.target.value })
              }
              className="w-16 p-2 border-gray-300 border-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
            />
            <input
              type="number"
              placeholder="کودک"
              value={passengers.child}
              onChange={(e) =>
                setPassengers({ ...passengers, child: e.target.value })
              }
              className="w-16 p-2 border-gray-300 border-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
            />
            <input
              type="number"
              placeholder="نوزاد"
              value={passengers.baby}
              onChange={(e) =>
                setPassengers({ ...passengers, baby: e.target.value })
              }
              className="w-16 p-2 border-gray-300 border-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[gold]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[gold] py-2 px-4 text-black rounded-full flex gap-2 items-center justify-center text-xs"
          >
            جستجو
            <IoSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
