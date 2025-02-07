import { useEffect, useState } from "react";
import HeaderTwo from "../components/HeaderTwo";
import { ImAirplane } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import SearchCard from "../components/SearchCard";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  let tripType = searchParams.get("tripType") === "دو طرفه";

  const flightType = searchParams.get("flightType") || "internal";
  const selectedStart = searchParams.get("selectedStart");
  const selectedEnd = searchParams.get("selectedEnd");
  const departDate = searchParams.get("departDate");
  const returnDate = searchParams.get("returnDate");
  const adult = searchParams.get("adult");
  const child = searchParams.get("child");
  const baby = searchParams.get("baby");

  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam) : 1;
  });

  const options = [
    {
      id: 1,
      label: "ماهان",
      logo: "./src/assets/images/search/logos/taban-sm.png",
    },
    {
      id: 2,
      label: "آسمان",
      logo: "./src/assets/images/search/logos/aseman-sm.png",
    },
    {
      id: 3,
      label: "ایران ایر",
      logo: "./src/assets/images/search/logos/ata-sm.png",
    },
  ];

  const handleCheckboxChange = (label) => {
    setSelectedAirlines((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((item) => item !== label)
        : [...prevSelected, label]
    );
  };

  useEffect(() => {
    setPage(1);
  }, [
    selectedAirlines,
    tripType,
    flightType,
    selectedStart,
    selectedEnd,
    departDate,
    returnDate,
  ]);

  useEffect(() => {
    const newParams = {
      tripType: tripType ? "دو طرفه" : "یک طرفه",
      flightType,
      selectedStart,
      selectedEnd,
      departDate,
      returnDate,
      adult,
      child,
      baby,
      page,
    };

    if (selectedAirlines.length > 0) {
      newParams.airlines = selectedAirlines.join(",");
    }

    setSearchParams(newParams);
  }, [
    selectedAirlines,
    tripType,
    flightType,
    selectedStart,
    selectedEnd,
    departDate,
    returnDate,
    adult,
    child,
    baby,
    setSearchParams,
    page,
  ]);

  const {
    data: searchData,
    isLoading,
    isError,
    isSuccess,
  } = useSearch({
    two_sided: tripType,
    flight_type: flightType,
    departure_city: selectedStart,
    arrival_city: selectedEnd,
    departure_time: departDate,
    arrival_time: returnDate,
    adult_passengers: adult ? parseInt(adult) : 0,
    child_passengers: child ? parseInt(child) : 0,
    baby_passengers: baby ? parseInt(baby) : 0,
    page: page,
    airline: selectedAirlines.length ? selectedAirlines.join(",") : undefined,
  });
  console.log(searchData);
  useEffect(() => {
    document.title = "پرنت | جستجو";
  }, []);

  return (
    <div className="bg-gray-100">
      <HeaderTwo />
      <div className="bg-white">
        <details className="collapse bg-white gap-5 px-24">
          <summary className="collapse-title text-base text-gray-700 flex gap-5 items-center font-medium text-center">
            <div className="flex gap-10 items-center justify-center">
              <div className="flex gap-2 items-center justify-center">
                <ImAirplane />
                بلیط هواپیما <span>{selectedStart || "..."}</span>
                به <span>{selectedEnd || "..."}</span>
              </div>
              <div className="flex gap-2">
                <span>
                  {parseInt(adult || 0) +
                    parseInt(child || 0) +
                    parseInt(baby || 0)}
                </span>{" "}
                مسافر
              </div>
              <button className="p-3 rounded-md bg-[gold]">
                <IoSearch />
              </button>
            </div>
          </summary>
          <div className="collapse-content">
            <div className="bg-gradient-to-tr from-[gold] to-[#9333ea] rounded-md py-10">
              <SearchBar />
            </div>
          </div>
        </details>
      </div>
      <div className="flex gap-5 px-24 pt-5 mb-10">
        <div className="w-1/4 bg-white rounded-md border p-5">
          <h1 className="text-gray-700 text-sm mb-5">شرکت های هواپیمایی</h1>
          <ul>
            {options.map((option) => (
              <li key={option.id} className="flex gap-2">
                <label className="label cursor-pointer flex gap-2">
                  <input
                    type="checkbox"
                    value={option.label}
                    checked={selectedAirlines.includes(option.label)}
                    onChange={() => handleCheckboxChange(option.label)}
                    className="checkbox checkbox-primary"
                  />
                  <img
                    src={option.logo}
                    className="object-cover w-6"
                    alt={option.label}
                  />
                  <span className="label-text text-gray-700">
                    {option.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 bg-white rounded-md border p-5">
          {searchData?.flights?.length > 0 ? (
            <div className="p-5 border rounded-md bg-gray-100">
              <SearchCard
                data={searchData}
                adult={adult}
                child={child}
                baby={baby}
              />
              {isLoading && <p className="text-gray-500">درحال جستجو.....</p>}
              {isError && (
                <p className="text-red-600 text-center">سفری یافت نشد </p>
              )}
              {isSuccess && (
                <div className="join grid   grid-cols-2 mt-2 px-24">
                  <button
                    className="join-item text-gray-700 btn btn-outline"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  >
                    صفحه قبل
                  </button>
                  <button
                    className="join-item text-gray-700 btn btn-outline"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    صفحه بعد
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-600 text-center">سفری یافت نشد</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
