const mongoose = require("mongoose")
const MenuSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique:true},
        desc: {type: String, required:true},
        img: { type: String, required: true},
        price:{ type: Boolean,default: false,}
    },
    {timestamps:true}
);
module.exports = mongoose.model("Menu", MenuSchema);