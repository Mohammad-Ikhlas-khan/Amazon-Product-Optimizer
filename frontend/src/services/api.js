const  BASE_URL="http://localhost:3000/api";// Update the port if your backend runs on a different port

export const API = {

    ALL_PRODUCTS:BASE_URL+"/history",

    PRODUCT_BY_ASIN: (asin) => `${BASE_URL}/product/${asin}`,
}
