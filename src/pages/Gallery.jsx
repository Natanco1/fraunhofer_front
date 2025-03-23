import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Collection from '../models/Collection';
import CollectionCard from '../components/CollectionCard';
import SpinnerLoader from '../components/SpinnerLoader';

function Gallery() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/get-all')
      .then((response) => {
        const data = response.data.collections.map(
          (collection) =>
            new Collection(
              collection.id,
              collection.name,
              collection.createdAt,
              collection.updatedAt
            )
        );
        setCollections(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-800 items-center justify-center flex-col mt-16 text-white">
      <h1 className="text-3xl mb-6 font-bold">🎨 Gallery</h1>

      {loading && (
        <div className="mt-8">
          <SpinnerLoader size="16" color="indigo-600" />
        </div>
      )}

      {error && <div className="text-red-500 mt-4 text-xl">{error}</div>}

      {!loading && !error && collections.length === 0 && (
        <div className="text-gray-400 text-xl mt-4">No collections found.</div>
      )}

      {!loading && !error && collections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
