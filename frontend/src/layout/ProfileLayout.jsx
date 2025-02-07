import { Link, useLocation } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useUserStore from "../stores/user-store";
import useUser from "../hooks/useUser";
import HeaderTwo from "../components/HeaderTwo";

const ProfileLayout = ({ children }) => {
  const { id, initializeAuth, logout } = useUserStore();
  const { data: user } = useUser(id);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  const location = useLocation();
  return (
    <div className="bg-gray-100">
      <HeaderTwo />
      {/* // body  */}

      <div className="mt-12 px-24 flex gap-5 pb-10 mb-20">
        {/* right  */}
        <div
          className="bg-white p-5 py-7 border w-1/4 border-gray-300 rounded-md flex flex-col
         justify-center text-center items-center gap-5 h-fit"
        >
          <img
            src="./src/assets/images/profile/f1.png"
            className=" border rounded-full border-[gold]"
          ></img>
          <div className="flex flex-col gap-2">
            <h1 className="text-black font-bold">{user?.full_name}</h1>
            <span className="text-gray-600">{user?.phone_number}</span>
          </div>
          {/* ////  */}
          <div className="bg-[#9333ea] p-3 rounded-md w-full flex flex-col gap-5">
            <div className="flex justify-between text-sm text-white">
              <span className="text-white flex gap-2 items-center">
                <FaWallet />
                موجودی حساب
              </span>
              <span className="text-xs"> 0 تومان</span>
            </div>
          </div>

          {/* ///  */}
          <div className="gap-4 w-full">
            <h3 className="text-xs text-gray-600 font-bold text-start mb-1">
              منوی کاربری
            </h3>
            <ul
              className="menu w-full rounded-md bg-white flex text-start
             text-gray-500 flex-col gap-4"
            >
              <Link to="/my-account">
                <li
                  className={`border border-slate-200 text-gray-500 rounded-md 
                     p-3 ${
                       location.pathname === "/my-account"
                         ? "bg-gray-200 text-gray-600"
                         : ""
                     }`}
                >
                  حساب کاربری
                </li>
              </Link>

              <Link to="/my-orders">
                <li
                  className={`border text-gray-500 border-slate-200 rounded-md p-3 ${
                    location.pathname === "/my-travels"
                      ? "bg-gray-200 text-gray-600"
                      : ""
                  }`}
                >
                  سفرهای من
                </li>
              </Link>

              <li
                className="border cursor-pointer border-slate-200 rounded-md p-3 hover:bg-gray-200 text-gray-600"
                onClick={() => logout()}
              >
                خروج از حساب
              </li>
            </ul>
          </div>
        </div>
        {/* left  */}
        <div className="bg-white p-7 border border-gray-300 w-3/4 rounded-md">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};
ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileLayout;
