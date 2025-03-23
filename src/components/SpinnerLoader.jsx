import React from 'react';

const SpinnerLoader = ({ size = '16', color = 'indigo-600' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`spinner animate-spin inline-block w-${size} h-${size} border-4 border-t-4 border-${color} border-solid rounded-full`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoader;
