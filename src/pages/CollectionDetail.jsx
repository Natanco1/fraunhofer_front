import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CollectionDetail() {
  const { id } = useParams();
  const [collectionDetail, setCollectionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/collection-detail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCollectionDetail(data);
      })
      .catch((error) => {
        setError('Error fetching collection details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!collectionDetail) {
    return <div>No details found for this collection.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Collection Detail</h1>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Name: {collectionDetail.name}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="font-semibold">Content Image</h3>
            <img
              src={`http://localhost:8000/media/content/${id}.png`}
              alt="Content"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Style Image</h3>
            <img
              src={`http://localhost:8000/media/style/${id}.png`}
              alt="Style"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Generated Image</h3>
            <img
              src={`http://localhost:8000/media/generated/${id}.png`}
              alt="Generated"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionDetail;
