import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

function Generate() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (image1 && image2) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [image1, image2]);

  const handleGenerateClick = () => {
    console.log("Images are ready to be processed!");
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
    </div>
  );
}

export default Generate;
