import React, { useEffect, useState } from "react";
import { fetchAllHistory } from "../services/Apis";
import OriginalProduct from "../components/OriginalProduct";
import OptimizedProduct from "../components/OptimizedProduct";

function HistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const result = await fetchAllHistory();
        setData(result);
      } catch (error) {
        console.error(error);
        alert("Error loading history.");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  if (loading) return <div className="p-6">Loading history...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">History</h2>
      <div className="space-y-8">
            {data.map((item, i) => (
                    <div key={item.original.asin || i} className="grid md:grid-cols-2 gap-6">
                        <OriginalProduct data={item.original} />
                        <OptimizedProduct asin={item.original.asin} data={item.optimized} />
                    </div>
            ))}
      </div>
    </div>
  );
}

export default HistoryPage;
