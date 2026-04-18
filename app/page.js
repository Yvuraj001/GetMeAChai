import Image from "next/image";
import Link from "next/link";

export default function Home() {


  return (
    <>

      <div className="flex text-white md:text-base justify-center items-center flex-col h-[44vh] gap-3 space-y-2 md:gap-5 mx-2">
        <div className="font-bold md:text-5xl text-xl flex items-center font-[poppins] ">Get Me A Chai! <span><img src="/tea.gif" className="h-20 md:h-30" alt="" /></span></div>
        <p className="text-[13px] md:text-base break-after-auto text-center font-[cursive]">A crowdfunding platform for creators. Get funded by your fans and followers. </p>
        <div>
          <button type="button" className="text-white bg-linear-to-br to-blue-500 hover:bg-linear-to-bl  cursor-pointer Idark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 from-purple-600 focus:outline-none"><Link href="/login">Start Now!</Link> </button>
          <button type="button" className="text-white bg-linear-to-br to-blue-500 hover:bg-linear-to-bl  cursor-pointer Idark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 from-purple-600 focus:outline-none"><Link href="/login" >Read More</Link></button>


        </div>

      </div>
      <div className="bg-white h-1 opacity-11"></div>

      <div className="container mx-auto pb-14   ">
        <div className="text-white font-bold text-center md:text-2xl text-xl my-16 font-[poppins]">
          Your fans can fund your Projects
        </div>
        <div className="flex gap-10 md:gap-3 text-white justify-around flex-wrap md:flex-nowrap mx-3">

          <div className="items space-y-2 flex justify-center items-center flex-col ">
            <img src="/man.gif" width={99} className=" bg-slate-400 rounded-full p-1" alt="" />
            <p>Fund Yourself</p>
            <p className="text-center  text-sm font-[cursive]"> Your fans are available for you to help you </p>
          </div>
          <div className="items space-y-2 flex justify-center items-center flex-col ">
            <img src="/coin.gif" width={99} className=" bg-slate-400 rounded-full p-1" alt="" />
            <p>Fund Yourself</p>
            <p className="text-center text-sm  font-[cursive]"> Your fans are available for you to help you </p>
          </div>
          <div className="items space-y-2 flex justify-center items-center flex-col ">
            <img src="/group.gif" className=" bg-slate-400 rounded-full p-1" width={99} alt="" />
            <p>Fund Yourself</p>
            <p className="text-center text-sm  font-[cursive]"> Your fans are available for you to help you </p>
          </div>

        </div>
      </div>
      <div className="bg-white h-1 opacity-11"></div>
      <div className="container md:mx-auto mx-2 pb-16 ">
        <div className="text-white font-bold text-center text-xl md:text-3xl my-12 flex flex-col justify-center items-center">
          Learn More About Us !
          <img src="/avatar.gif" className="mt-7" width={180} alt="" />

          <div className="text-sm text-center md:text-lg font-normal mt-4 font-[cursive]">We are available at Github, LinkedIN , Facebook and Youtube.</div>
        </div>
      </div>
    </>
  );
}
