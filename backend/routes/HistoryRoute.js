const express=require('express');
const router=express.Router();

const {getAllProducts}=require('../controllers/getAllProductsController');


router.get('/history',getAllProducts);


module.exports=router;

