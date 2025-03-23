import React, { useState } from 'react';

function Generate() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800 items-center justify-center text-3xl flex-col mt-16">
      <div className="flex space-x-8 mb-8">
        <div
          className="flex flex-col items-center justify-center w-80 h-80 bg-gray-700 rounded-lg shadow-lg p-4 cursor-pointer"
          onClick={() => document.getElementById("fileInput1").click()}
        >
          <div className="text-xl text-gray-300 mb-4">🖼️ Add Image</div>
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-500 w-full h-full rounded-md">
            {image1 ? (
              <img src={image1} alt="Selected" className="object-cover w-full h-full rounded-md" />
            ) : (
              <div className="text-sm text-gray-400">Click to attach image</div>
            )}
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center w-80 h-80 bg-gray-700 rounded-lg shadow-lg p-4 cursor-pointer"
          onClick={() => document.getElementById("fileInput2").click()}
        >
          <div className="text-xl text-gray-300 mb-4">🎨 Add Style</div>
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-500 w-full h-full rounded-md">
            {image2 ? (
              <img src={image2} alt="Selected" className="object-cover w-full h-full rounded-md" />
            ) : (
              <div className="text-sm text-gray-400">Click to attach image</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <button className="text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-lg shadow-md text-xl opacity-50 cursor-not-allowed">
          Generate
        </button>
      </div>

      <input
        type="file"
        id="fileInput1"
        className="hidden"
        onChange={(e) => handleImageChange(e, setImage1)}
        accept="image/*"
      />
      <input
        type="file"
        id="fileInput2"
        className="hidden"
        onChange={(e) => handleImageChange(e, setImage2)}
        accept="image/*"
      />
    </div>
  );
}

export default Generate;
