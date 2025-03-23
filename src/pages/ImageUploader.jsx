import React from 'react';

function ImageUploader({ label, image, setImage, fileInputId }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        setImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-80 h-80 bg-gray-700 rounded-lg shadow-lg p-4 cursor-pointer relative"
      onClick={() => document.getElementById(fileInputId).click()}
    >
      {image && (
        <div
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border-2 border-white shadow-xl transition-all hover:bg-red-600 hover:scale-110"
        onClick={handleRemoveImage}
      >
        <span className="text-lg font-semibold">×</span>
      </div>
      
      )}
      <div className="text-xl text-gray-300 mb-4">{label}</div>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-500 w-full h-full rounded-md">
        {image ? (
          <img src={`data:image/png;base64,${image}`} alt="Selected" className="object-cover w-full h-full rounded-md" />
        ) : (
          <div className="text-sm text-gray-400">Click to attach image</div>
        )}
      </div>
      <input
        type="file"
        id={fileInputId}
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
}

export default ImageUploader;
