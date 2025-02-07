import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import { useState } from "react";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const { mutate: Register } = useRegister();

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const onSubmitRegister = (data) => {
    Register(data, {
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
    <form
      onSubmit={handleSubmit(onSubmitRegister)}
      className="flex flex-col gap-3 justify-center items-center w-full"
    >
      <input
        {...register("full_name", { required: true, minLength: 3 })}
        type="text"
        placeholder="نام و نام خانوادگی"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="bg-white border-2 border-gray-300 rounded-lg w-2/3 py-2 px-5 focus:ring-[gold]"
      />

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
      <button className="bg-[gold] w-2/3 rounded-lg py-2 px-5">ثبت‌نام</button>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>✅ ثبت‌نام با موفقیت انجام شد!</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default RegisterPage;
