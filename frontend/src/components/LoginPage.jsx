import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: Login } = useLogin();
  const [showToast, setShowToast] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = (data) => {
    Login(data, {
      onSuccess: () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        reset();
      },
    });
    console.log(data);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        className="flex flex-col gap-3 justify-center items-center w-full"
      >
        <input
          type="email"
          placeholder="ایمیل"
          {...register("email", { required: true })}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border-2 border-gray-300 rounded-lg w-2/3 py-2 px-5 focus:ring-[gold]"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          {...register("password", { required: true })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white border-2 border-gray-300 rounded-lg w-2/3 py-2 px-5 focus:ring-[gold]"
        />
        <button className="bg-[gold] w-2/3 rounded-lg py-2 px-5">
          تایید و دریافت
        </button>
      </form>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>✅ ورود با موفقیت انجام شد!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
