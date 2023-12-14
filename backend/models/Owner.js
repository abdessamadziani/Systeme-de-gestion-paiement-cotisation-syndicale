const mongoose = require('mongoose');
const {v1:uuid}=require('uuid')

const Schema = mongoose.Schema;   
const ownerSchema = new Schema({
    name:   {
            type: String,
            trim: true,
             },
    cin:     {
            type: String,
            trim: true,
             },

  

},{timestamps: true});





module.exports=mongoose.model('owner',ownerSchema)

