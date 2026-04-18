'use server'

import Razorpay from "razorpay"
import Users from "@/app/models/Users"
import Payment from "@/app/models/Payment"
import connectDB from "@/app/db/connectdb"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    const p = await Users.findOne({ username: to_username })
   
    const secret = p.razorpaysecret
    const ID = p.razorpayID

    var instance = new Razorpay({
        key_id: ID, key_secret:
            secret
    })
    // creating new order on razor pay
    // This tells RP that order consists of amount(e.g. 5000) and currenty indian rupees
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }
    // Then creates order and  ....
    let x = await instance.orders.create(options)

    await Payment.create({
        name: paymentform.name,
        to_user: to_username,
        oid: x.id,
        message: paymentform.message,
        amount: amount / 100,
        done: "false"
    })
    // return x = { id: "order_ABC123", amount: 50000, currency: "INR", status: "created" }
    return x
    // then it continue on PaymenPage.js
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await Users.findOne({ username: username })
     if (!u) return null
    let user = u.toObject({ flattenObjectIds: true })
      if (!user) return null
    return user
}

export const fetchpayment = async (username) => {
    await connectDB()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return JSON.parse(JSON.stringify(p))
}
// .limit(10) before .lean()

export const updateProfile = async (data, olduser) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    if (olduser !== ndata.username) {
        // Check if username exist 
        let u = await Users.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already taken!" }
        }

        await Users.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the Payments table
        await Payment.updateMany({ to_user: olduser }, { to_user: ndata.username })
    }
    else {

        await Users.updateOne({ email: ndata.email }, ndata)
    }
}
