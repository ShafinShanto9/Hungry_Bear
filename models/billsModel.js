const mongoose = require("mongoose")



const billsSchema = mongoose.Schema({
    customerName: {type:String, required:true },
    customerPhoneNumber: {type:String, required:true },
    paymentMode: {type:String, required:true },
    subTotal: {type:Number, required:true },
    Tax: {type:Number, required:true },
    TotalAmount: { type: Number, required: true },
    cartItems: {type: Array, required: true}
}, {timestamps:true})


const billsModel = mongoose.model('bills', billsSchema)
module.exports = billsModel