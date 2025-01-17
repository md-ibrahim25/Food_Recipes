import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
    </div>
  );
}

export default LoadingSpinner;
