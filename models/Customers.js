const mongoose = require("mongoose")
const CustomerSchema = new mongoose.Schema(
    {
        Customername: {type: String, required: true, unique:true},
        image: {type: String, required:true},
        message: { type: String, required: true},
       
    },
    {timestamps:true}
);
module.exports = mongoose.model("Customer", CustomerSchema);