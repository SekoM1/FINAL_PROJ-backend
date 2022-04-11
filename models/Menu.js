const mongoose = require("mongoose")
const MenuSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique:true},
        desc: {type: String, required:true},
        img: { type: String, required: true},
        price:{ type: Number,default: true,},
        category:{ type: String,default: true,}
    },
    {timestamps:true}
);
module.exports = mongoose.model("Menu", MenuSchema);