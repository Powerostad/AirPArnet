import { useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import useUserStore from "../stores/user-store";
import useUser from "../hooks/useUser";

const MyAccount = () => {
  const { id, initializeAuth } = useUserStore();
  const { data: user } = useUser(id);
  useEffect(() => {
    initializeAuth();
    document.title = "پرنت | حساب کاربری ";
  }, [initializeAuth]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between w-full">
        <h1 className="text-black font-bold flex items-center gap-2">
          <MdOutlineAccountCircle size={20} />
          اطلاعات حساب کاربری
        </h1>
        <span
          className="text-[#9333ea] text-sm flex gap-2 items-center cursor-pointer"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <FiEdit3 />
          ویرایش اطلاعات
        </span>
      </div>
      <div className="flex flex-col w-full gap-10">
        <div className="flex border-b pb-5 justify-between">
          <h3 className="text-sm text-gray-500">شماره موبایل</h3>
          <span className="text-black font-bold">{user?.phone_number}</span>
        </div>
        <div className="flex border-b pb-5 justify-between">
          <h3 className="text-sm text-gray-500">ایمیل</h3>
          <span className="text-black font-bold">{user?.email}</span>
        </div>
        <div className="flex border-b pb-5 justify-between">
          <h3 className="text-sm text-gray-500">نام و نام خانوادگی</h3>
          <span className="text-black font-bold">{user?.full_name}</span>
        </div>
        <div className="flex pb-5 justify-between">
          <h3 className="text-sm text-gray-500">تاریخ تولد</h3>
          <span className="text-black font-bold">1370/10/3</span>
        </div>
      </div>
      {/* ////  */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white flex flex-col gap-5">
          <h3 className="font-bold text-lg text-gray-700">
            ویرایش اطلاعات شخصی
          </h3>
          <label className="input input-bordered border-2 bg-white text-gray-800 flex items-center gap-2">
            نام
            <input type="text" className="grow focus:ring-[gold]" />
          </label>
          <label className="input input-bordered border-2 bg-white text-gray-800 flex items-center gap-2">
            نام خانوادگی
            <input type="text" className="grow focus:ring-[gold]" />
          </label>
          <h3 className="text-gray-800 text-sm text-center">تاریخ تولد</h3>
          <div className="flex justify-center">
            <div className="flex w-10/12 justify-center">
              <label
                className="input w-1/3 text-xs input-bordered border-2 rounded-l-none
             bg-white text-gray-800 flex items-center gap-2"
              >
                روز
                <input type="text" className="grow focus:ring-[gold]" />
              </label>
              <label
                className="input w-1/3 text-xs input-bordered border-2 rounded-l-none rounded-r-none
             bg-white text-gray-800 flex items-center gap-2"
              >
                ماه
                <input type="text" className="grow focus:ring-[gold]" />
              </label>
              <label
                className="input w-1/3 text-xs input-bordered border-2  rounded-r-none
             bg-white text-gray-800 flex items-center gap-2"
              >
                سال
                <input type="text" className="grow focus:ring-[gold]" />
              </label>
            </div>
          </div>
          <label className="input input-bordered border-2 bg-white text-gray-800 flex items-center gap-2">
            کد ملی
            <input type="text" className="grow focus:ring-[gold]" />
          </label>

          <div className="modal-action">
            <button className="bg-[gold] text-black px-4 rounded-lg hover:bg-[goldenrod]">
              ثبت
            </button>
            <form method="dialog">
              <button className="btn bg-gray-100 border-none text-gray-600 text-sm hover:bg-gray-200">
                بستن
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyAccount;
