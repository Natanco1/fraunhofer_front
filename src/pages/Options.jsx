import React from 'react';

function Options() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="flex flex-col w-64 bg-gray-900 p-6 fixed top-0 left-0 h-full shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 glow">Options</h1>

        <div className="space-y-4">
          <button
            className="w-full text-lg text-left px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 text-white"
          >
            Collections
          </button>
        </div>
      </div>

      <div className="pl-72 pt-16 px-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Collections Settings</h2>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Download All</h3>
            <p className="text-gray-400 mb-4">
              Download all collections in a zip file.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-lg">
              Download All Collections
            </button>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Delete All</h3>
            <p className="text-gray-400 mb-4">
              Delete all collections permanently. This action cannot be undone.
            </p>
            <button className="bg-red-500 hover:bg-red-800 text-white px-6 py-2 rounded-lg">
              Delete All Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
