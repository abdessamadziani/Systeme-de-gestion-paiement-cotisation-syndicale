const mongoose = require('mongoose');
const {v1:uuid}=require('uuid')
const ObjectId=mongoose.Types.ObjectId

const Schema = mongoose.Schema;   
const paymentSchema = new Schema({
   
    ownerId: {
            type:ObjectId,
            ref:'owner'
           },
    appartementId: {
    type:ObjectId,
    ref:'appartement'
    },

    status: {
    type: Boolean,
    default: false,
    }

},{timestamps: true});





module.exports=mongoose.model('payment',paymentSchema)

