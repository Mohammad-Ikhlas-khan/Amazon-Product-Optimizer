import React from 'react'

function OriginalProduct({data}) {
    if(!data) return null;
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">Original Product</h3>
        <p><strong>ASIN:</strong> {data.asin}</p>
        <p><strong>Title:</strong> {data.title || "N/A"}</p>
        <div><strong>Bullet Points</strong>{" "}
            {data.bullets && data.bullets.length>0?(
            <ul className="list-disc ml-5">
            {data.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
            ))}
            </ul>
        ) : (
            <span> N/A</span>
        )}
        </div>
        <p><strong>Description:</strong> {data.description || "N/A"}</p>
        <p>
            <strong>Keywords:</strong>{" "}
            {data.keywords && data.keywords.length > 0
                ? data.keywords.join(", ")
                : "N/A"}
            </p>
    </div>
  )
}

export default OriginalProduct