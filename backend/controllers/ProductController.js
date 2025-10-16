const {generateOptimizedDescriptionAndKeywords}=require("../utils/ai");
const OptimizeProductDetails=require("../models/OptimizeProductDetails");
const OriginalProductDetails=require("../models/OriginalProductDetails");
const ScrappedDetails=require("../utils/ScrappedDetails");

exports.getProductByAsin=async(req,res)=>{
    try{
        const {asin}=req.params;
        let originalProduct=await OriginalProductDetails.findOne({where:{asin}});
        if(!originalProduct){
            const data=await ScrappedDetails({asin});
            if (!data) return res.status(404).json({ message: "Original product could not be fetched" });
            originalProduct=await OriginalProductDetails.create({
                asin,
                title:data.title,
                bullets:data.bullets,
                description:data.description,
                last_fetched_at:new Date(),
            });
        }

        let optimizedProduct= await OptimizeProductDetails.findOne({ where: { product_id: originalProduct.id } });
        const title=originalProduct.title;
        const bullets=originalProduct.bullets;
        const description=originalProduct.description;
        const optimizedJsonString=await generateOptimizedDescriptionAndKeywords({title,bullets,description});
        if(!optimizedJsonString){
                return res.status(500).json({message:'Failed to generate optimized details'});
            }
        const optimizedData=JSON.parse(optimizedJsonString);
        const keywordArray = optimizedData.keywords 
                                ? optimizedData.keywords.split(',').map(k => k.trim()) 
                                : [];
        const data={
                product_id:originalProduct.id,
                optimized_title:optimizedData.optimized_title|| originalProduct.title,
                optimized_bullets:optimizedData.optimized_bullets || originalProduct.bullets,
                optimized_description: optimizedData.optimized_description || originalProduct.description,
                keywords:keywordArray,
            }
        if (!optimizedProduct) {
            optimizedProduct=await OptimizeProductDetails.create(data);
        }
        else{
            await OptimizeProductDetails.update(data,{ where: { product_id: originalProduct.id } })
            optimizedProduct = await OptimizeProductDetails.findOne({ where: { product_id: originalProduct.id } });
        }

       res.status(200).json({ original: originalProduct, optimized: optimizedProduct });
    }
    catch(err){
        console.error('Error optimizing product details:', err);
        res.status(500).json({message:'Internal server error'});
    }
}
