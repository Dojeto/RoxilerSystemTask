import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  sold: Boolean,
});

const Product = mongoose.model("Product", productSchema);

export default Product;