import React from 'react'

function OptimizedProduct({asin,data}) {
     if(!data) return null;
  return (
     <div className="border rounded-lg shadow p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">Optimized Product</h3>
        <p><strong>ASIN:</strong> {asin}</p>
        <p><strong>Title:</strong> {data.optimized_title || "N/A"}</p>
        <div><strong>Bullet Points</strong>{" "}
            {data.optimized_bullets && data.optimized_bullets.length>0?(
            <ul className="list-disc ml-5">
            {data.optimized_bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
            ))}
            </ul>
        ) : (
            <span> N/A</span>
        )}
        </div>
        <p><strong>Description:</strong> {data.optimized_description || "N/A"}</p>
        <p>
            <strong>Keywords:</strong>{" "}
            {data.keywords && data.keywords.length > 0
                ? data.keywords.join(", ")
                : "N/A"}
        </p>
    </div>
  )
}

export default OptimizedProduct