import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Collection from '../models/Collection';
import CollectionCard from '../components/CollectionCard'; 

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-3xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-3xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-gray-100">
      <div className="text-3xl mb-8">🎨 Gallery Page (User's Creations)</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
