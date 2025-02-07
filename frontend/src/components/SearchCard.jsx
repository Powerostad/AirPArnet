import { IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ data, adult, child, baby }) => {
  const flights = data && Array.isArray(data.flights) ? data.flights : [];
  const navigate = useNavigate();

  const handleSelectFlight = (segment) => {
    const flightData = {
      airline: segment.airline.name,
      flightNumber: segment.flight_number,
      departureTime: segment.departure_time,
      arrivalTime: segment.arrival_time,
      departureCity: segment.departure_city,
      arrivalCity: segment.arrival_city,
      price: segment.price_per_adult,
      flightId: segment.id,
      adult: adult,
      child: child,
      baby: baby,
    };

    navigate(`/orders-progress?${new URLSearchParams(flightData).toString()}`);
  };

  return (
    <div className=" rounded-md flex flex-col gap-5">
      {flights.map((flight, index) =>
        flight.segments && flight.segments.length > 0 ? (
          flight.segments.map((segment) => (
            <div
              key={segment.id || index}
              className="bg-white p-5 rounded-md border flex"
            >
              {/* Right Section */}
              <div className="border-l-2 border-gray-300 w-3/4 flex flex-col gap-5">
                {/* Flight Details */}
                <div className="flex gap-1 w-full items-center">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <img
                      src={`./src/assets/images/search/logos/ata-sm.png`}
                      alt="Airline Logo"
                    />
                    <h2 className="text-black whitespace-nowrap flex gap-2 text-base">
                      ایرلاین :{" "}
                      <span className="font-bold">{segment.airline.name}</span>
                    </h2>
                  </div>
                  <div className="flex justify-between w-full items-center text-black px-10">
                    <div className="flex gap-5 text-xl">
                      <h3 className="flex gap-2 items-center">
                        {segment.departure_city}
                      </h3>
                      <span className="font-bold">
                        {new Date(segment.departure_time).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400 font-bold">
                      ---------
                      <IoIosArrowBack />
                    </div>
                    <div className="flex gap-5 text-xl">
                      <h3 className="flex gap-2 items-center">
                        {segment.arrival_city}
                      </h3>
                      <span className="font-bold">
                        {new Date(segment.arrival_time).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Flight Information */}
                <div className="flex gap-5 text-sm w-full text-black">
                  <div className="flex flex-col w-full">
                    <details className="collapse bg-white">
                      <summary className="collapse-title text-sm font-medium">
                        <span className="bg-[gold] p-2 rounded-md">
                          اطلاعات پرواز
                        </span>
                      </summary>
                      <div className="collapse-content">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="w-full flex flex-col gap-2">
                            <h3 className="font-bold">شماره پرواز</h3>
                            <span>{segment.flight_number}</span>
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <h3 className="font-bold">مقدار بار مجاز</h3>
                            <span>{segment.load_capacity} kg</span>
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <h3 className="font-bold">ظرفیت باقی‌مانده</h3>
                            <span>{segment.available_seats} صندلی</span>
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <h3 className="font-bold">کلاس پرواز</h3>
                            <span>{segment.class_type}</span>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              {/* Left Section: Pricing & Booking */}
              <div className="w-1/4 flex flex-col justify-start p-5 items-center gap-5">
                <div className="flex gap-2 items-center">
                  <span className="text-lg text-[#9333ea] font-bold">
                    {segment.price_per_adult.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-600">تومان</span>
                </div>
                <span className="font-bold text-gray-500">
                  نرخ رسمی ایرلاین
                </span>
                <button
                  className="bg-[gold] rounded-md py-1 text-center text-sm text-black w-full"
                  onClick={() => handleSelectFlight(segment)}
                >
                  انتخاب پرواز
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            key={index}
            className="bg-white p-5 rounded-md border text-center text-gray-500"
          >
            اطلاعات پرواز ناقص است
          </div>
        )
      )}
    </div>
  );
};

// ✅ PropTypes validation
SearchCard.propTypes = {
  data: PropTypes.shape({
    flights: PropTypes.arrayOf(
      PropTypes.shape({
        segments: PropTypes.arrayOf(
          PropTypes.shape({
            is_international: PropTypes.bool,
            price_per_baby: PropTypes.number,
            price_per_adult: PropTypes.number,
            arrival_time: PropTypes.string,
            arrival_city: PropTypes.string,
            flight_number: PropTypes.string,
            id: PropTypes.number,
            load_capacity: PropTypes.number,
            available_seats: PropTypes.number,
            departure_time: PropTypes.string,
            departure_city: PropTypes.string,
            airline_id: PropTypes.number,
            class_type: PropTypes.string,
          })
        ),
      })
    ),
  }),
  adult: PropTypes.string,
  child: PropTypes.string,
  baby: PropTypes.string,
};

export default SearchCard;
