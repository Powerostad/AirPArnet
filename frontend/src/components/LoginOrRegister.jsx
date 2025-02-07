import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const LoginOrRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h3 className="font-bold text-sm">
        {isLogin ? "ورود یا ثبت نام" : "ثبت نام"}
      </h3>

      <p className="py-4 text-gray-600">
        {isLogin
          ? "برای ادامه ایمیل خود را وارد کنید."
          : "لطفا اطلاعات خود را وارد کنید."}
      </p>

      {isLogin && <LoginPage />}

      {!isLogin && <RegisterPage />}

      <p className="text-[11px] flex gap-1 items-center">
        <FaInfoCircle />
        استفاده از پرنت به معنی پذیرش{" "}
        <span className="text-[gold]"> قوانین و مقررات </span> این سرویس است.
      </p>

      <p
        className="text-sm text-[gold] hover:text-[goldenrod] cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "حساب کاربری ندارید ؟ ثبت‌نام کنید"
          : "قبلا ثبت‌نام کرده‌اید؟ ورود"}
      </p>
    </div>
  );
};

export default LoginOrRegister;
