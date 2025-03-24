import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CollectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collectionDetail, setCollectionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/get-collection/${id}/`)
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

  const handleDelete = () => {
    setDeleting(true);
    fetch(`http://localhost:8000/api/delete-collection/${id}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setError(null);
          setCollectionDetail(null);
          setShowModal(false);
          navigate('/');
        } else {
          throw new Error('Failed to delete collection');
        }
      })
      .catch((error) => {
        setError('Error deleting collection');
      })
      .finally(() => {
        setDeleting(false);
      });
  };

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

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Collection Information</h2>
        <div className="space-y-2">
          <p><strong>Collection Name:</strong> {collectionDetail.collection.name}</p>
          <p><strong>Collection ID:</strong> {collectionDetail.collection.id}</p>
          <p><strong>Created At:</strong> {collectionDetail.collection.createdAt}</p>
          <p><strong>Last Updated:</strong> {collectionDetail.collection.updatedAt}</p>
        </div>
        <button
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          onClick={() => setShowModal(true)}
        >
          Delete Collection
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-white mb-4">Are you sure you want to delete this collection?</h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Images</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Content Image</h3>
              <img
                src={`http://localhost:8000/media/content/${id}.png`}
                alt="Content"
                className="w-full h-64 object-contain rounded-lg shadow-md"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Style Image</h3>
              <img
                src={`http://localhost:8000/media/style/${id}.png`}
                alt="Style"
                className="w-full h-64 object-contain rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-2">Generated Image</h3>
            <img
              src={`http://localhost:8000/media/generated/${id}.png`}
              alt="Generated"
              className="w-full h-64 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionDetail;