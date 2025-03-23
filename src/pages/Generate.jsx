import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

function Generate() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (image1 && image2) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [image1, image2]);

  const handleGenerateClick = async () => {
    if (!image1 || !image2) {
      setError('Please upload both content and style images.');
      return;
    }
  
    const formData = new FormData();
    formData.append('content_image', image1);
    formData.append('style_image', image2);
  
    console.log('FormData before sending:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/style-transfer/', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setResultImage(data.style_transferred_image);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred while generating the image.');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-800 items-center justify-center text-3xl flex-col mt-16">
      <div className="flex space-x-8 mb-8">
        <ImageUploader
          label="🖼️ Add Image"
          image={image1}
          setImage={setImage1}
          fileInputId="fileInput1"
        />
        
        <ImageUploader
          label="🎨 Add Style"
          image={image2}
          setImage={setImage2}
          fileInputId="fileInput2"
        />
      </div>

      <div>
        <button
          onClick={handleGenerateClick}
          className={`text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-lg shadow-md text-xl ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'glow'}`}
          disabled={isButtonDisabled}
        >
          Generate
        </button>
      </div>

      {error && <div className="text-red-500 mt-4 text-xl">{error}</div>}

      {resultImage && (
        <div className="mt-8">
          <h2 className="text-white text-2xl">Generated Image:</h2>
          <img src={resultImage} alt="Generated Style" className="mt-4" />
        </div>
      )}
    </div>
  );
}

export default Generate;
