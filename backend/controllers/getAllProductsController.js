const OptimizeProductDetails=require("../models/OptimizeProductDetails");
const OriginalProductDetails=require("../models/OriginalProductDetails");

exports.getAllProducts=async(req,res)=>{
    try{
        const originals=await OriginalProductDetails.findAll();      

        const productsWithOptimized = await Promise.all(
        originals.map(async (orig) => {
            const optimized = await OptimizeProductDetails.findOne({ where: { product_id: orig.id } });
            return {
            original: orig,
            optimized: optimized || null, // null if optimized not yet created
            };
        })
        );

        res.status(200).json(productsWithOptimized);
    }   
    catch(err){
        console.error('Error fetching product details:', err);
        res.status(500).json({message:'Internal server error'});
    }
}