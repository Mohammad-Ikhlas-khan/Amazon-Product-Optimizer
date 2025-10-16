const express=require('express');
const router=express.Router();

const {getProductByAsin}=require("../controllers/ProductController");

router.get('/product/:asin',getProductByAsin);

module.exports=router;

