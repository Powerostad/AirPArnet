import { FaArrowRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import useOrderDetail from "../hooks/useOrderDetail";
import useUserStore from "../stores/user-store";
import { useEffect } from "react";
// import useMyOrders from "../hooks/useMyOrders";

const OrderDetail = () => {
  const { id: userId, initializeAuth } = useUserStore();
  // const { data: orders } = useMyOrders(id);

  const { id } = useParams();
  const { data: orderDetail, isLoading, error } = useOrderDetail(userId, id);

  const booking = orderDetail?.booking_date;
  console.log(booking);
  const bookingDate = new Date(booking);
  const formattedBooking = bookingDate.toLocaleString("fa-IR", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  const departure = orderDetail?.flight?.departure_time;
  console.log(departure);
  const departureDate = new Date(departure);
  const formattedDeparture = departureDate.toLocaleString("fa-IR", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  const arrival = orderDetail?.flight?.departure_time;
  console.log(arrival);
  const arrivalDate = new Date(arrival);
  const formattedArrival = arrivalDate.toLocaleString("fa-IR", {
    dateStyle: "full",
    timeStyle: "medium",
  });


  const departureReturn = orderDetail?.return_flight?.departure_time;
  
  const departureDateReturn = new Date(departureReturn);
  const formattedDepartureReturn = departureDateReturn.toLocaleString("fa-IR", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  const arrivalReturn = orderDetail?.flight?.departure_time;
  console.log(arrival);
  const arrivalDateREturn = new Date(arrivalReturn);
  const formattedArrivalReturn = arrivalDateREturn.toLocaleString("fa-IR", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  useEffect(() => {
    initializeAuth();
    document.title = "پرنت | سفرهای من  ";
  }, [initializeAuth]);

  if (isLoading) return <p>در حال بارگذاری جزئیات سفارش...</p>;
  if (error || !orderDetail) return <p>خطا در دریافت اطلاعات!</p>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-7">
        <Link
          to={"/my-orders"}
          className="border p-2 text-black hover:bg-purple-500 rounded-md"
        >
          <FaArrowRight />
        </Link>
        <div className="text-black">
          شماره سفارش :<span>{orderDetail?.id}</span>
        </div>
        <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-md">
          {orderDetail?.status === "CONFIRMED"
            ? "نهایی شده"
            : "در انتظار پرداخت"}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        زمان خرید : <span>{formattedBooking}</span>
      </div>
      <div className="border rounded-md p-5 flex flex-col gap-5">
        <h1 className="text-black text-lg">
          پرواز <span>رفت</span>{" "}
          <span className="font-bold">
            {orderDetail?.flight.departure_city}
          </span>{" "}
          به {""}
          <span className="font-bold">{orderDetail?.flight?.arrival_city}</span>
        </h1>
        <span className="text-gray-500 text-sm">
          {" "}
          زمان حرکت : <span>{formattedDeparture}</span>
        </span>
        <span className="text-gray-500 text-sm">
          {" "}
          شماره پرواز : <span>{OrderDetail?.flight?.flight_number}</span>
        </span>
        <div className="text-gray-700 flex gap-10">
          <h2>تابان</h2>
          <span>
            شروع : <span className="font-bold">{formattedDeparture}</span> پایان
            : <span className="font-bold">{formattedArrival}</span>
          </span>
        </div>
        {!!orderDetail.return_flight && (
          <div className="flex flex-col gap-5">
            <h1 className="text-black text-lg">
              پرواز <span>بازگشت</span>{" "}
              <span className="font-bold">
                {orderDetail?.return_flight?.departure_city}
              </span>{" "}
              به {""}
              <span className="font-bold">
                {orderDetail?.return_flight?.arrival_city}
              </span>
            </h1>
            <span className="text-gray-500 text-sm">
              {" "}
              زمان حرکت : <span>{formattedDepartureReturn}</span>
            </span>
            <span className="text-gray-500 text-sm">
              {" "}
              شماره پرواز : <span>{OrderDetail?.return_flight?.flight_number}</span>
            </span>
            <div className="text-gray-700 flex gap-10">
              <h2>تابان</h2>
              <span>
                شروع :{" "}
                <span className="font-bold">{formattedDepartureReturn}</span>{" "}
                پایان :{" "}
                <span className="font-bold">{formattedArrivalReturn}</span>
              </span>
            </div>
          </div>
        )}
        <div className="text-gray-700 text-base border-2 p-5 rounded">
          مبلغ پرداخت شده :{" "}
          <span className="font-bold">{orderDetail?.total_price}</span> تومان
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
