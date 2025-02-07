import { useEffect, useState } from "react";
import OrdersCard from "../components/OrdersCard";
import useMyOrders from "../hooks/useMyOrders";
import useUserStore from "../stores/user-store";
import { ImAirplane } from "react-icons/im";
import { Link, useSearchParams } from "react-router-dom";

const MyOrders = () => {
  const { id: userId, initializeAuth } = useUserStore();

  // Get the page number from the URL search parameters (pagination)
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam) : 1; // Default to page 1 if no page param
  });

  const { data: orders, isLoading, error } = useMyOrders(userId, page);

  console.log("Orders Data:", orders?.data);
  orders?.data?.forEach((order) => console.log("Order ID:", order.id));

  useEffect(() => {
    initializeAuth();
    document.title = "پرنت | سفرهای من  ";
  }, [initializeAuth]);

  useEffect(() => {
    // Update the URL with the current page when the page state changes
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطایی رخ داده است!</p>;
  if (!orders || orders.length === 0) return <p>سفری یافت نشد.</p>;

  // Handle next and previous page button clicks
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure page doesn't go below 1
  };

  return (
    <div className="flex flex-col gap-5">
      {orders.data.map((order) => (
        <Link key={order.id} to={`/order-detail/${order.id}`}>
          <OrdersCard
            icon={<ImAirplane />}
            transportation={order?.transportation || "هواپیما"}
            status={
              order?.status === "CONFIRMED" ? "نهایی شده" : "در انتظار پرداخت"
            }
            orderNumber={order?.id}
            amount={order?.total_price}
          />
        </Link>
      ))}

      {/* Pagination buttons */}
      <div className="flex justify-between mt-5">
        <button onClick={handlePrevPage} disabled={page === 1}>
          قبلی
        </button>
        <span>صفحه {page}</span>
        <button onClick={handleNextPage}>بعدی</button>
      </div>
    </div>
  );
};

export default MyOrders;
