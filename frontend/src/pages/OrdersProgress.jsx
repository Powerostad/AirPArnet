import { useEffect, useState } from "react";
import HeaderTwo from "../components/HeaderTwo";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft, FaCheck, FaCircleCheck } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { LuFileCheck2, LuTicket } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import useBooking from "../hooks/useBooking";
import useUserStore from "../stores/user-store";
import { useForm } from "react-hook-form";
import useBookingPayment from "../hooks/useBookingPayment";

const OrdersProgress = () => {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep, 10) : 2;
  });

  // const [passengerData, setPassengerData] = useState([]);
  // const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    refund: false,
    // gender: "مرد",
    birthDate: "",
  });

  const { register, handleSubmit } = useForm();

  const { id: userId, initializeAuth } = useUserStore();

  const { mutate } = useBooking(userId);

  const [refundOption, setRefundOption] = useState(false);

  const handleRefundChange = (e) => {
    setRefundOption(e.target.value === "true");
  };

  const bookingId = localStorage.getItem("bookingId");
  const { mutate: payment } = useBookingPayment(userId, bookingId);

  // useEffect(() => {
  //   const savedStep = localStorage.getItem("currentStep");
  //   if (savedStep) setStep(parseInt(savedStep));

  //   const savedPassengers = localStorage.getItem("passengerData");
  //   if (savedPassengers) setPassengerData(JSON.parse(savedPassengers));
  // }, []);

  const handlePayment = (data) => {
    payment(data, {
      onSuccess: () => {
        handleNextStep();
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // dynamically updates the corresponding field
    });
  };
  // const handleAddPassenger = () => {
  //   if (!formData.firstName || !formData.lastName) {
  //     alert("لطفاً تمام فیلدها را پر کنید.");
  //     return;
  //   }

  //   setPassengerData([...passengerData, formData]);
  //   setFormData({
  //     firstName: "",
  //     lastName: "",
  //     gender: "مرد",
  //     birthDate: { day: "", month: "", year: "" },
  //   });
  //   setModalOpen(false);
  // };

  useEffect(() => {
    initializeAuth();
    document.title = "پرنت |  سفارش  ";
  }, [initializeAuth]);

  useEffect(() => {
    localStorage.setItem("currentStep", step);
  }, [step]);

  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => {
        const newStep = prev + 1;
        localStorage.setItem("currentStep", newStep);
        return newStep;
      });
    }
  };

  const handleOnSubmit = (data) => {
    const formattedData = {
      flight_id: flightId,
      return_flight_id: null,
      passengers: [
        {
          first_name: data.first_name,
          last_name: data.last_name,
          national_id: "some-national-id",
          birthdate: "2025-02-07",
        },
      ],
      refund: refundOption,
    };

    mutate(formattedData, { onSuccess: () => handleNextStep() });
  };

  const handlePervStep = () => {
    if (step > 1) {
      setStep((prev) => {
        const newStep = prev - 1;
        localStorage.setItem("currentStep", newStep);
        return newStep;
      });
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const airline = queryParams.get("airline");
  const flightNumber = queryParams.get("flightNumber");
  const departureTime = queryParams.get("departureTime");
  const arrivalTime = queryParams.get("arrivalTime");
  const departureCity = queryParams.get("departureCity");
  const arrivalCity = queryParams.get("arrivalCity");
  const price = queryParams.get("price");
  const flightId = queryParams.get("flightId");
  const adult = queryParams.get("adult");
  const child = queryParams.get("child");
  const baby = queryParams.get("baby");

  return (
    <div className="bg-gray-100">
      <HeaderTwo />

      {/* nav  */}
      <div className="bg-white flex p-5 text-sm justify-center w-full mb-10">
        <div className="flex gap-7 text-lg">
          <div
            className={` ${
              step >= 1 ? "text-success" : ""
            } flex items-center gap-1`}
          >
            <FaCheck />
            انتخاب پرواز
            <IoIosArrowBack />
          </div>
          <div
            className={`flex items-center gap-1 ${
              step >= 2 ? "text-success" : ""
            } ${step == 2 ? "font-bold" : ""}`}
          >
            <MdGroups />
            مشخصات
            <IoIosArrowBack />
          </div>
          <div
            className={`flex items-center gap-1 ${
              step >= 3 ? "text-success" : ""
            } ${step == 3 ? "font-bold" : ""}`}
          >
            <LuFileCheck2 />
            تایید اطلاعات
            <IoIosArrowBack />
          </div>
          <div
            className={`flex items-center gap-1 ${
              step >= 4 ? "text-success" : ""
            } ${step == 4 ? "font-bold" : ""}`}
          >
            <LuTicket />
            صدور بلیط
          </div>
        </div>
      </div>
      {/* nav  */}
      <div className="px-24 mb-10">
        {step == 2 && (
          <div className="flex flex-col gap-10 justify-center items-center pb-40">
            <div
              className="flex flex-col gap-5 w-2/3 p-5 border rounded-md items-start
             bg-white"
            >
              <div className="flex gap-5">
                <div className="text-purple-600 bg-purple-300 flex gap-2 items-center px-2 text-sm rounded-md">
                  <FaArrowLeft />
                  پرواز
                </div>
                <div className="font-bold text-sm text-gray-500">
                  قیمت : {price}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <img src="./src/assets/images/search/logos/ata-sm.png"></img>
                  <h2 className="text-black text-xl whitespace-nowrap">
                    {airline}
                  </h2>
                </div>
                <div className="flex justify-between w-full items-center gap-5 text-black px-10">
                  <div className="flex gap-5 text-xl ">
                    <h3 className="flex gap-2 items-center">{departureCity}</h3>
                    <span className="font-bold">{departureTime}</span>
                  </div>
                  <div className="flex items-center text-gray-400 font-bold">
                    -----
                    <IoIosArrowBack />
                  </div>
                  <div className="flex gap-5 text-xl ">
                    <h3 className="flex gap-2 items-center">{arrivalCity}</h3>
                    <span className="font-bold">{arrivalTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-5 w-2/3 p-5 border rounded-md items-start
             bg-white"
            >
              <h2 className="text-black flex items-center gap-2">
                <MdGroups />
                مشخصات مسافران
              </h2>
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="flex flex-col gap-3 w-full"
              >
                <label
                  className="input input-bordered border-2 bg-white
                 text-gray-800 flex items-center gap-2"
                >
                  نام
                  <input
                    {...register("first_name", { required: true })}
                    type="text"
                    className="grow focus:ring-[gold]"
                    onChange={handleInputChange}
                  />
                </label>
                <label
                  className="input input-bordered border-2 bg-white
                 text-gray-800 flex items-center gap-2"
                >
                  نام خانوادگی
                  <input
                    {...register("last_name", { required: true })}
                    type="text"
                    className="grow focus:ring-[gold]"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="flex gap-5 items-center text-black text-sm">
                  جنسیت
                  <select className="rounded-md bg-white border-2 w-full h-10 border-gray-200">
                    <option value="زن">زن</option>
                    <option value="مرد">مرد</option>
                  </select>
                </label>
                <div className="flex gap-5 items-center">
                  <h3 className="text-gray-800 text-sm whitespace-nowrap">
                    تاریخ تولد
                  </h3>

                  <div className="flex w-full justify-center">
                    <label
                      className="input text-xs input-bordered border-2 whitespace-nowrap rounded-md w-full
             bg-white text-gray-800 flex items-center gap-2"
                    >
                      <input
                        {...register("birthdate", { required: true })}
                        type="text"
                        className="grow focus:ring-[gold]"
                        onChange={handleInputChange}
                        placeholder="روز , ماه , سال"
                      />
                    </label>
                  </div>
                </div>
                <button
                  className="border-2 flex items-center w-fit gap-2 border-[#9333ea] rounded-md px-5 py-1 text-xs
                 text-[#9333ea] hover:bg-[#9333ea] hover:text-white"
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  <FiPlus />
                  اضافه کردن مسافر
                </button>
                <h2 className="text-black flex items-center gap-2">
                  خدمات سفر
                </h2>
                <div className="bg-white p-5 flex flex-col gap-5 rounded-md border">
                  <div className="border-2 rounded-md p-5 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <label className="flex gap-2">
                        <input
                          type="radio"
                          value="false"
                          checked={refundOption === false}
                          onChange={handleRefundChange}
                          className="radio radio-success"
                        />
                        <span className="text-black"> استرداد عادی</span>
                      </label>
                      <span className="text-sm text-gray-500">بدون هزینه</span>
                    </div>
                    <p className="text-sm text-yellow-500">
                      استرداد این بلیط مطابق قوانین ایرلاین از ۱۲ ساعت قبل از
                      پرواز شامل حداقل ۲,۱۰۰,۰۰۰ تومان جریمه خواهد بود.
                    </p>
                  </div>
                  <div className="border-2 rounded-md p-5 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <label className="flex gap-2">
                        <input
                          type="radio"
                          value="true"
                          checked={refundOption === true}
                          onChange={handleRefundChange}
                          className="radio radio-success"
                        />
                        <span className="text-black"> استرداد بدون جریمه</span>
                      </label>
                      <span className="text-xs text-gray-500">
                        هر مسافر |{" "}
                        <sapn className="text-[#9333ea] font-bol text-sm">
                          420
                        </sapn>{" "}
                        تومان
                      </span>
                    </div>
                    <p className="text-sm text-green-500">
                      در صورت استرداد تا 12 ساعت قبل از پرواز، مبلغ بلیط بدون
                      جریمه به شما برمی‌گردد.
                    </p>
                  </div>
                  <details className="collapse bg-white text-black">
                    <summary className="collapse-title text-sm  font-medium">
                      <span className="bg-[gold] p-2 rounded-md">
                        شرایط و قوانین
                      </span>
                    </summary>
                    <div className="collapse-content">
                      <ul className="list-disc text-sm">
                        <li>
                          جهت استفاده از این ضمانت، فقط کافیست درخواست استرداد
                          خود را ثبت کنید. پس از بررسی مبلغ بلیط به صورت کامل
                          برای شما واریز خواهد شد.
                        </li>
                        <li>
                          توجه نمایید که برای استفاده از ضمانت میبایست حداکثر تا
                          12 ساعت مانده به پرواز، درخواست استرداد خود را ثبت
                          نمایید.
                        </li>
                        <li>
                          پس از استرداد، تنها مبلغ بلیط پرداخت می‌شود و هزینه
                          پرداخت شده جهت ضمانت شامل بازپرداخت نمی‌شود.
                        </li>
                        <li>
                          در صورت کنسل شدن پرواز به علت تغییرات ایرلاین، مبلغ
                          ضمانت به مسافر باز می‌گردد.
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
                <button
                  type="submit"
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className="bg-[#9333ea] text-white px-4 py-2 rounded"
                >
                  تایید و ادامه خرید
                </button>
              </form>

              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box bg-white flex flex-col gap-5">
                  <h3 className="font-bold text-lg text-gray-700">
                    اضافه کردن مسافر
                  </h3>
                  <label className="input input-bordered border-2 bg-white text-gray-800 flex items-center gap-2">
                    نام
                    <input type="text" className="grow focus:ring-[gold]" />
                  </label>
                  <label className="input input-bordered border-2 bg-white text-gray-800 flex items-center gap-2">
                    نام خانوادگی
                    <input type="text" className="grow focus:ring-[gold]" />
                  </label>
                  <label className="flex gap-5 items-center text-black text-sm">
                    جنسیت
                    <select className="rounded-md bg-white border-2 w-full h-10 border-gray-200">
                      <option value="یک طرفه">زن</option>
                      <option value="دو طرفه">مرد</option>
                    </select>
                  </label>
                  <h3 className="text-gray-800 text-sm text-center">
                    تاریخ تولد
                  </h3>
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

            {/* <div className="mt-20 text-gray-100">ddddd</div> */}
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-5 px-24 pb-20">
            <div className="bg-white rounded-md border-2 p-5">
              <h2 className="text-black flex items-center gap-2 mb-10">
                <LuTicket />
                اطلاعات بلیط
              </h2>
              <div className="flex flex-col">
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm">
                  <span className="font-bold">نام و نام خانوادگی</span>
                  <span>علی</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm ">
                  <span className="font-bold">مبدا</span>
                  <span>{departureCity}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm">
                  <span className="font-bold">مقصد</span>
                  <span>{arrivalCity}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm ">
                  <span className="font-bold">شرکت هواپیمایی</span>
                  <span>{airline}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm ">
                  <span className="font-bold">تاریخ وساعت پرواز</span>
                  <span>{departureTime}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm ">
                  <span className="font-bold">شماره پرواز</span>
                  <span>{flightNumber}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm">
                  <span className="font-bold">مقدار باز مجاز</span>
                  <span>-</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md border-2 flex flex-col p-5">
              <h2 className="text-black flex items-center gap-2 mb-10">
                <MdGroups />
                مشخصات مسافران
              </h2>
              <div className="flex flex-col">
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm">
                  <span className="font-bold">بزرگسال</span>
                  <span>{adult}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm ">
                  <span className="font-bold">کودک</span>
                  <span>{child}</span>
                </div>
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm">
                  <span className="font-bold">نوزاد</span>
                  <span>{baby}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md border-2 flex flex-col p-5">
              <h2 className="text-black flex items-center gap-2 mb-10">
                <MdGroups />
                خدمات سفر
              </h2>
              <div className="flex flex-col">
                <div className="grid grid-cols-2 p-2 w-full text-black text-sm bg-gray-200 rounded-sm">
                  <span className="font-bold">
                    {refundOption ? "استرداد بدون جریمه" : "استرداد عادی"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col gap-5 px-24 pb-72">
            <div className="bg-white border rounded-md p-5">
              <h2 className="text-black flex items-center gap-2 mb-10">
                <LuTicket />
                صدور بلیط
              </h2>
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col gap-5 text-green-500 text-lg justify-center items-center font-bold">
                  <FaCircleCheck />
                  <p>بلیط شما با موفقیت صادر شد</p>
                </div>
                <p className="text-base text-gray-500">
                  شماره سفارش: <span className="font-bold">{bookingId}</span>
                </p>
                <Link
                  to={"/my-orders"}
                  className="bg-white border-2 border-[#9333ea] text-lg rounded-md p-3 text-[#9333ea]"
                >
                  مشاهده سفارش
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-t-2 fixed bottom-0 w-full py-7 px-20">
        {step === 2 && (
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">
              با کلیک روی تایید و ادامه خرید با قوانین سایت و قوانین پرواز
              موافقت کرده‌اید.
            </p>
            {/* <button
              type="submit"
              onSubmit={handleSubmit(handleOnSubmit)}
              className="bg-[#9333ea] text-white px-4 py-2 rounded"
            >
              تایید و ادامه خرید
            </button> */}
          </div>
        )}

        {step === 3 && (
          <div className="flex justify-between">
            <button
              className="bg-purple-500 flex gap-2 items-center text-white px-4 text-sm py-2 rounded"
              onClick={handlePervStep}
            >
              <IoIosArrowForward />
              بازگشت
            </button>
            <div className="flex items-center gap-4">
              <span className="flex gap-3 items-center">
                <p className="text-gray-500 text-sm font-bold">
                  مبلغ قابل پرداخت
                </p>
                <span className="text-[#9333ea] text-lg font-bold">12345</span>
              </span>
              <button
                onClick={handlePayment}
                className="bg-[#9333ea] text-white px-4 py-2 rounded"
              >
                تایید و ادامه خرید
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex justify-between">
            <button
              className="bg-purple-500 flex gap-2 items-center text-white px-4 text-sm py-2 rounded"
              onClick={handlePervStep}
            >
              <IoIosArrowForward />
              بازگشت
            </button>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default OrdersProgress;
