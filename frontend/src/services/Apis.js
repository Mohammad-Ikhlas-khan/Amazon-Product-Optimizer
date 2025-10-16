import { apiConnector } from "./apiConnector";
import { API } from "./api";

const {
  ALL_PRODUCTS,
  PRODUCT_BY_ASIN
} = API;


 //Fetch or create product details (original + optimized) by ASIN
 //If not present, backend will create them.
 
export const fetchOrCreateProductDetails = async (asin) => {
     try {
        const res = await apiConnector("GET",PRODUCT_BY_ASIN(asin),null);
        return res.data;
    } catch (err) {
        console.error("API error:", err.response?.data || err.message);
        throw new Error("Failed to fetch or create product details");
    }
};

//Fetch all product history (original + optimized)
export const fetchAllHistory = async () => {
  try {
    const res = await apiConnector("GET", ALL_PRODUCTS,null);
    return res.data;
  } catch (error) {
    console.error("Error fetching product history:", error);
    throw error;
  }
};
