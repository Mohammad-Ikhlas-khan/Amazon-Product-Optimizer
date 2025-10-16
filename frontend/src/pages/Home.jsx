import React,{useState} from 'react'
import { fetchOrCreateProductDetails } from '../services/Apis';
import OriginalProduct from '../components/OriginalProduct';
import OptimizedProduct from '../components/OptimizedProduct';
function Home() {
    const [asin,setAsin]=useState("");
    const [original,setOriginal]=useState(null);
    const [optimized,setOptimized]=useState(null);
    const [loading, setLoading] = useState(false);


    const clickHandler=async()=>{
        if (!asin.trim()) return alert("Please enter an ASIN");
        setLoading(true);
        try {
        const result = await fetchOrCreateProductDetails(asin.trim());
        setOriginal(result.original);
        setOptimized(result.optimized);
        } catch (error) {
        console.error(error);
        alert("Error fetching product details.");
        } finally {
        setLoading(false);
        }
    };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ASIN Lookup</h2>
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
          placeholder="Enter ASIN number"
          className="border p-2 w-64 rounded"
        />
        <button
          onClick={clickHandler}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <OriginalProduct data={original} />
        <OptimizedProduct asin={asin} data={optimized} />
      </div>
    </div>
  )
}

export default Home