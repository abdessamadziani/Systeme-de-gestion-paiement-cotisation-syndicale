const mongoose = require('mongoose');
const {v1:uuid}=require('uuid')
const ObjectId=mongoose.Types.ObjectId

const Schema = mongoose.Schema;   
const appartementSchema = new Schema({
    nb:   {
            type: Number,
           },
   floor: {
            type: Number,
           },
   price: {
            type: Number,
           },
   building: {
           type: String,
           trim: true,
          },
    ownerId: {
            type:ObjectId,
            ref:'owner'
          },
  
   

},{timestamps: true});





module.exports=mongoose.model('appartement',appartementSchema)

