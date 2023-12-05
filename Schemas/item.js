//schemas
import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({

//   name:String,
//   price:String,
//   category:String,
//   userId:String,
//   company:String,

//   {
//     "name":"M40",
//  "price":"400",
//  "category":"mobile",
//  "userId":"64b9e332965e04db150eee74",
//  "company":"Sumsung"
// }
productID: {
  type: Number,
  required: true,
},

  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  // image:{
  //     type: Image,
  //     required:true,
  // },
  raiting: [
    {
      rate: {
        type: Number,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      },
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});
const Item = mongoose.model("products", itemSchema);

export default Item;
