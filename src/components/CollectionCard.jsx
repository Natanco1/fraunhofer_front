import React from 'react';

function CollectionCard({ collection }) {
  return (
    <div className="p-6 bg-gray-900 shadow-lg rounded-2xl w-full text-white border border-gray-700 transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-2xl font-bold text-indigo-400">{collection.name}</h3>
      <p className="text-gray-400 mt-2">Created: {new Date(collection.createdAt).toLocaleString()}</p>
      <p className="text-gray-500">Updated: {new Date(collection.updatedAt).toLocaleString()}</p>
    </div>
  );
}

export default CollectionCard;
