import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CollectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collectionDetail, setCollectionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageClick = (imageType) => {
    const imageUrl = `http://localhost:8000/media/${imageType}/${id}.png`;
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
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

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Images</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center" onClick={() => handleImageClick('content')}>
            <h3 className="font-semibold mb-2">Content Image</h3>
            <img
              src={`http://localhost:8000/media/content/${id}.png`}
              alt="Content"
              className="w-full h-64 object-contain rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="text-center" onClick={() => handleImageClick('style')}>
            <h3 className="font-semibold mb-2">Style Image</h3>
            <img
              src={`http://localhost:8000/media/style/${id}.png`}
              alt="Style"
              className="w-full h-64 object-contain rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            />
          </div>

          <div className="col-span-2 text-center" onClick={() => handleImageClick('generated')}>
            <h3 className="font-semibold mb-2">Generated Image</h3>
            <img
              src={`http://localhost:8000/media/generated/${id}.png`}
              alt="Generated"
              className="w-full h-64 object-contain rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {showModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-gray-900 p-8 rounded-lg w-auto max-w-3xl">
            <img
              src={selectedImage}
              alt="Full Screen"
              className="w-full h-auto object-contain rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionDetail;
