import React from 'react';

function CollectionCard({ collection }) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full">
      <h3 className="text-xl font-semibold">{collection.name}</h3>
      <p>Created At: {new Date(collection.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(collection.updatedAt).toLocaleString()}</p>
    </div>
  );
}

export default CollectionCard;
