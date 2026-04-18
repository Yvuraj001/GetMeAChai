import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Users from "@/app/models/Users";
import connectDB from "@/app/db/connectdb";
 

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    // check if order id is present 

    let a = await Payment.findOne({ oid: body.razorpay_order_id })

    if (!a) {
      NextResponse.json({sucess:false, message:"Payment Id not found!"})
    }
    // Fetching user's razorpay secret
    const p = await Users.findOne({username: a.to_user})
   const secret = p.razorpaysecret

    // verifying the payment
    let xx = validatePaymentVerification({
        "order_id": body.razorpay_order_id, "payment_id": body.
            razorpay_payment_id} , body.razorpay_signature
    , secret)

   if(xx){
        // Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: "true"}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?pd=true`)  
    }
    else{
        NextResponse.json({sucess:false, message:"Payment Verification Failed"})
    }
} 
 