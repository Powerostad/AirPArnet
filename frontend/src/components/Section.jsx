import { BsFillTelephoneFill } from "react-icons/bs";

const Section = () => {
  return (
    <div className="bg-white px-24 mb-36">
      <div className="bg-gray-100 flex justify-between items-center rounded-md">
        <div className="pr-24 flex gap-40">
          <div className="flex flex-col text-xl gap-5 text-black">
            <h1 className="font-bold">سفر دور دنیا با پرنت</h1>
            <p>سفر، تنها محدود به آرزوهای توست!</p>
          </div>
          <div className="text-xl text-black flex flex-col gap-5">
            <div className="flex items-center gap-2 font-bold">
              ۰۲۱-۱۲۳۴
              <BsFillTelephoneFill />
            </div>
            <button className="bg-[#9333ea] text-white rounded-lg px-4 py-2 
            hover:bg-[#9400ea]">اطلاعات بیشتر</button>
          </div>
        </div>
        <img
          src="./src/assets/images/homeImages/train.png"
          className="rounded-md"
        ></img>
      </div>

      
    </div>
  );
};

export default Section;
