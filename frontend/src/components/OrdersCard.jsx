import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";


const OrdersCard = ({ transportation, status, orderNumber, amount, icon }) => {
  

  return (
    <div className="border p-2 rounded-md border-gray-300">
      <div className="flex w-full justify-between items-center border-b border-gray-300 p-5">
        <h2 className="text-black font-bold flex items-center gap-2">
          {icon}
          {transportation}
        </h2>
        <span
          className={`text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-md`}
        >
          {status}
        </span>
      </div>
      <div className="flex justify-between p-5">
        <div className="flex gap-12">
          <div className="flex gap-5 items-center">
            <h4 className="text-black text-sm">شماره سفارش:</h4>
            <span className="text-black font-bold">{orderNumber}</span>
          </div>
          <div className="flex gap-5 items-center">
            <h4 className="text-black text-sm">مبلغ پرداخت شده:</h4>
            <span className="text-black font-bold">
              {amount}
              <span className="text-xs"> تومان</span>
            </span>
          </div>
        </div>

        <span className="text-sm text-[#9333ea] flex gap-2 items-center cursor-pointer">
          جزییات سفارش
          <IoIosArrowBack />
        </span>
      </div>
    </div>
  );
};

OrdersCard.propTypes = {
  transportation: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  icon: PropTypes.node,
};

export default OrdersCard;
