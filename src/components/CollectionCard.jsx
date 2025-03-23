import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CollectionCard({ collection, onUpdateName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(collection.name);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setNewName(collection.name);
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    setIsUpdating(true);

    try {
      const response = await fetch('http://localhost:8000/api/update-collection/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: collection.id,
          name: newName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update collection');
      }

      setIsEditing(false);
      onUpdateName({ ...collection, name: newName });
    } catch (error) {
      console.error('Error updating collection:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6 bg-gray-700 shadow-lg rounded-2xl w-full text-white border border-gray-600 transform hover:scale-105 transition-transform duration-300 relative flex flex-col items-center cursor-pointer">
      <div className="flex justify-center mb-4">
        <img
          src={collection.imageUrl}
          alt={collection.name}
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>
      {!isEditing ? (
        <>
          <h3 className="text-2xl font-bold text-indigo-400 text-center w-full">
            {collection.name}
          </h3>
          <p className="text-gray-400 mt-2">Created: {new Date(collection.createdAt).toLocaleString()}</p>
          <p className="text-gray-500">Updated: {new Date(collection.updatedAt).toLocaleString()}</p>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4 w-full">
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded-md transition-all hover:bg-green-600 disabled:opacity-50"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md transition-all hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

<div className="absolute top-2 right-2 flex space-x-1">
  <div
    className="bg-blue-500 text-white rounded-full cursor-pointer transition-all hover:bg-blue-600"
    onClick={handleEditClick}
    style={{ padding: '3px', fontSize: '13px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
  >
    <i className="fa fa-pencil"></i>
  </div>

  <Link 
    to={`/collection/${collection.id}`} 
    className="bg-yellow-500 text-white rounded-full cursor-pointer transition-all hover:bg-yellow-600"
    style={{ padding: '3px', fontSize: '13px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
  >
    <i className="fa fa-eye"></i>
  </Link>
</div>
    </div>
  );
}

export default CollectionCard;
