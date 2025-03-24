import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollectionCard from '../components/CollectionCard';
import SpinnerLoader from '../components/SpinnerLoader';

function Gallery() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/get-all')
      .then((response) => {
        const data = response.data.collections.map((collection) => ({
          id: collection.id,
          name: collection.name,
          createdAt: collection.createdAt,
          updatedAt: collection.updatedAt,
          imageUrl: `http://localhost:8000/media/generated/${collection.id}.png`
        }));
        setCollections(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCollections = collections.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(collections.length / itemsPerPage);

  const handleUpdateCollectionName = (updatedCollection) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === updatedCollection.id
          ? { ...collection, name: updatedCollection.name }
          : collection
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">🎨 Gallery</h1>

      {loading && (
        <div className="mt-6">
          <SpinnerLoader size="16" color="indigo-600" />
        </div>
      )}

      {error && <div className="text-red-500 text-xl mt-4">{error}</div>}

      {!loading && !error && collections.length === 0 && (
        <div className="text-gray-400 text-xl mt-4">No collections found.</div>
      )}

      {!loading && !error && collections.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {currentCollections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onUpdateName={handleUpdateCollectionName}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-indigo-600'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Gallery;
