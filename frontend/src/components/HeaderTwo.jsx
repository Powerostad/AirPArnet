import { BsFillTelephoneFill, BsPersonFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import LoginOrRegister from "./LoginOrRegister";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import useUserStore from "../stores/user-store";

const HeaderTwo = () => {
  const { id, initializeAuth } = useUserStore();
  const { data: user } = useUser(id);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <div
      className="top-0 left-0 w-full flex justify-between items-center
         px-24 h-20 border-b"
    >
      {/* right */}
      <div className="navbar text-white flex gap-8 items-center">
        <Link to={"/"}>
          <div className="flex gap-2 items-center">
            <img src="logo.png" className="size-10"></img>
            <span className="btn btn-ghost text-3xl font-bold text-black">
              پرنت
            </span>
          </div>
        </Link>
        <div className="flex-none">
          <ul className="menu menu-horizontal font-bold text-black">
            <li>
              <details>
                <summary className="flex gap-3">بلیط</summary>
                <ul
                  className="bg-white rounded-lg w-32 flex flex-col 
                justify-between text-black p-2"
                >
                  <li className="w-full text-black text-center whitespace-nowrap">
                    <Link to={"/"}>پرواز داخلی</Link>
                  </li>
                  <li className="w-full text-black text-center whitespace-nowrap">
                    <Link to={"/foreign"}>پرواز خارجی</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to={"/about"}>درباره ما</Link>
            </li>
            <li>
              <a
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                تماس
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* left */}
      <div>
        {id ? (
          <Link to={"/my-account"}>
            <button
              className="py-2 px-3 rounded-md text-xs font-bold whitespace-nowrap
           text-black border-none hover:bg-gray-300 flex gap-2 items-center bg-gray-200"
            >
              <BsPersonFill />
              {user?.full_name}
            </button>
          </Link>
        ) : (
          <button
            className="py-2 px-3 rounded-md text-xs font-bold whitespace-nowrap
             text-black border-none hover:bg-gray-300 flex gap-2 items-center bg-gray-200"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <BsPersonFill />
            ورود یا ثبت‌نام
          </button>
        )}
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <LoginOrRegister />
        </div>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box bg-white text-black p-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="text-lg text-black text-center font-bold mb-5">
            تماس با ما
          </h1>
          <p className="text-xs leading-7 mb-5">
            برای هرگونه سوال، پیشنهاد یا درخواست پشتیبانی، خوشحال می‌شویم که با
            ما تماس بگیرید. تیم پشتیبانی پرنت به‌طور مداوم در تلاش است تا بهترین
            خدمات را به شما ارائه دهد و از نظرات و پیشنهادات شما استقبال می‌کند.
            لطفاً برای ارتباط با ما از طریق فرم زیر استفاده کنید یا به آدرس
            ایمیل و شماره تماس ارائه شده مراجعه نمایید. تیم ما در سریع‌ترین زمان
            ممکن پاسخگوی شما خواهد بود.
          </p>
          <div className="text-center border p-3 flex flex-col gap-4 border-slate-300 rounded-md">
            <div className="font-bold flex justify-center gap-2">
              <BsFillTelephoneFill color="gold" />
              شماره تماس: ۰۲۱ - ۱۲۳۴ ۰۰۰۰
            </div>
            <div className="font-bold flex justify-center items-center gap-2">
              <MdOutlineEmail color="gold" size={20} />
              ایمیل: mail@email.com
            </div>
            <div className="font-bold text-sm px-10 flex justify-center items-center ">
              <FaLocationDot color="gold" size={30} />
              آدرس دفتر مرکزی: خیابان ولی‌عصر، تقاطع بلوار کشاورز، پلاک ۱۲۳،
              طبقه ۱۲۳، واحد ۱۲۳
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HeaderTwo;
