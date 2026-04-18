"use client"
import React from 'react'
import { useState, useEffect, } from 'react'
import Script from 'next/script'
import { initiate, fetchpayment, fetchuser } from '@/actions/useraction'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
 


// Always use x.amount and x.currency from the server response instead of the frontend input 
const PaymentPage = ({ username }) => {
  const { data: session } = useSession()
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: ""
  })
  const [currentuser, setcurrentuser] = useState({})
  const [currentpayment, setcurrentpayment] = useState([])
  const router = useRouter()
  const SearchParams = useSearchParams()

  

  useEffect(() => {
    getdata()

  }, [])
  useEffect(() => {
    if (SearchParams.get("pd") === "true") {
      toast('Thanks For Your Support!! 💕', {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
         router.push(`/${username}`)
      }, 4000);
    }
   
  }, [])



  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getdata = async () => {
    let dbuser = await fetchuser(username)

    setcurrentuser(dbuser)

    let dbpayment = await fetchpayment(username)
    setcurrentpayment(dbpayment)

  }

  const pay = async (amount) => {

    let a = await initiate(amount, username, paymentform)
    let orderid = a.id
    // This opens razor pay paymnet dialoge and tell what are the details are given
    var options = {
      "key": currentuser.razorpayID,
      "amount": amount,
      "currency": "INR",
      "name": "Get Me A Chai",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderid,
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    var rzp1 = new Razorpay(options)
    rzp1.open()

  }


  return (
    <>

     <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>


      {/* This is dialog box of razor pay */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


      <>

        <div className="cover relative text-[13px] text-yellow-300">
          <img className='object-cover w-full h-80' src={currentuser.coverpic} alt="Please Upload CoverPic Url on Your Dashboard" />
          <div className='absolute -bottom-20 right-[45%] overflow-hidden '>
            <img width={150} className='rounded-full object-cover border-4 h-max[150px] w-max[150px] h-37.5 border-red-800 shadow-lg object-center' src={currentuser.profilepic} alt="" />
          </div>
        </div>
        <div className="info flex justify-center items-center my-24 flex-col gap-2 ">
          <div className='font-bold '>@{username}</div>

          <div className='text-[#afadad] flex gap-1   text-[12px]'>Let's Help<div className='font-bold text-yellow-300   text-[13px]'>`{username}`</div> to get a Chai!</div>
          <div className='text-[#afadad] flex gap-1   text-[12px]'>{currentpayment.length} Payments .<div className='text-yellow-300 font-bold   text-[12px]'>`{currentuser.name}` </div>has raised <div className='text-yellow-300 font-bold   text-[12px]'>₹{currentpayment.reduce((a, b) => a + b.amount, 0)} </div></div>


          <div className="payment flex gap-5 md:gap-3 w-full  justify-center  md:w-[80%] md:flex-nowrap flex-wrap">

            <div className="supporters w-[80%] md:w-1/2 bg-slate-800 rounded-lg mx-3 p-2 md:p-9">
              <h2 className='font-bold text-[15px] md:text-2xl my-3 md:my-5 '>Top 10 Supporters :</h2>
              <div>
              <ul className='mx-4 h-[50vh] overflow-y-auto overflow-x-hidden text-[12px] md:text-[14px]'>


                {currentpayment.length == 0 && <li>No payments yet</li>}
                {currentpayment.map((p, i) => {
                  return <li key={i} className='my-2 flex items-center gap-2'>
                    <img src="/avatar.gif" alt="Avatar" width={35} />
                    <span> {p.name} donated <span className='font-bold text-yellow-300'>₹{p.amount}</span> with a message "<span className='text-yellow-400'>{p.message}"</span></span></li>

                })}




              </ul>
              </div>
            </div>
            <div className="makepayment w-[80%] md:w-1/2 bg-slate-800 rounded-lg  p-2.5 md:p-9">

              <h2 className='text-[15px] md:text-2xl font-bold my-5'>Make a Payment</h2>
              <div className='flex gap-6 flex-col'>

                <input autoComplete="true" onChange={handlechange} value={paymentform.name} name='name' type="text" className='md:text-[14px] text-[11px] w-full p-3 rounded-2xl border [bg-slate-800' placeholder='Enter name' />
                <input autoComplete="true" onChange={handlechange} value={paymentform.message} name='message' type="text" className='md:text-[14px] text-[11px] w-full p-3 rounded-2xl border [bg-slate-800' placeholder='Message' />
                <input autoComplete="true" onChange={handlechange} value={paymentform.amount} name='amount' type="number" className='md:text-[14px] text-[11px] w-full p-3 rounded-2xl border [bg-slate-800' placeholder='Enter Amount, min-₹10' />

                <div className='space-y-3 text-sm md:text-[14px]'>
                  <div>or choose from these :</div>
                  <div className='flex gap-2'>
                    <button className=' cursor-pointer  text-[11px] p-2 md:p-3 rounded-2xl border md:text-[14px]' onClick={() => { pay(1000) }}>Pay ₹10</button>
                    <button className='cursor-pointer text-[11px] p-2 md:p-3 rounded-2xl border md:text-[14px] ' onClick={() => { pay(2000) }}>Pay ₹20</button>
                    <button className='cursor-pointer text-[11px] p-2 md:p-3 rounded-2xl border md:text-[14px] ' onClick={() => { pay(3000) }}>Pay ₹30</button>
                  </div>
                </div>

                <button disabled={paymentform.name.trim().length < 1 ||
                   paymentform.amount.length < 1} onClick={() => {
                    pay(paymentform.amount * 100)
                  }} className="text-white bg-linear-to-br to-blue-500 hover:bg-linear-to-bl  cursor-pointer Idark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 from-purple-600 focus:outline-none disabled:from-slate-600 text-[11px] md:text-[14px]">
                  Pay
                </button>
              </div>



            </div>


          </div>
        </div>

      </>
    </>


  )
}

export default PaymentPage




