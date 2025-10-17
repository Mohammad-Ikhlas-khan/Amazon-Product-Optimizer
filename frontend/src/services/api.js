const  BASE_URL=import.meta.env.BASE_URL;
; // Update the port if your backend runs on a different port

export const API = {

    ALL_PRODUCTS:BASE_URL+"/history",

    PRODUCT_BY_ASIN: (asin) => `${BASE_URL}/product/${asin}`,
}
