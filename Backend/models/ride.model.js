const mongoose = require('mongoose');

const rideSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'user',
        required:true
    },
    captain:{
        type:mongoose.Schema.ObjectId,
        ref:'captain'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','completed','cancellation','ongoing'],
        default:'pending'
    },
    duration:{
        type:Number
    },
    distance:{
        type:Number,

    },
    paymentID:{
        type:String,
    },
    orderID:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false
    }
})

module.exports = mongoose.model('ride',rideSchema);