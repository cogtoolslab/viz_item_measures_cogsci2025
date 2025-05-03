import React, { useState } from "react";

interface FullscreenImageProps {
  src: string;
  alt: string;
}

// const ZoomInIcon: React.FC = () => (
// <svg
//     className=""
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="currentColor"
//   strokeWidth="2"
//   strokeLinecap="round"
//   strokeLinejoin="round"
//   width="32"
//   height="32"
// >
//   <path d="M3 8V5a2 2 0 0 1 2-2h3" />
//   <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
//   <path d="M3 16v3a2 2 0 0 0 2 2h3" />
//   <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
// </svg>

  
// );

const FullscreenImage: React.FC<FullscreenImageProps> = ({ src, alt }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // const handleImageClick = () => {
  //   setIsFullscreen(true);
  // };

  const handleCloseFullscreen = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Prevent closing when clicking the image
    setIsFullscreen(false);
  };

  return (
    <div className="">
      <div  className="flex mx-auto text-gray-800 hover:text-gray-500 hover:outline-gray-500  transition duration-200">
        <img
          src={src}
          alt={alt}
          style={{ maxWidth: "1000px", maxHeight: "600px" }}
          className="rounded-lg mx-auto"
        />
        {/* Zoom Icon */}
        {/* <div onClick={handleImageClick} className="rounded-lg p-2 cursor-pointer h-full bg-gray-100 hover:bg-gray-200 ">
          <ZoomInIcon />
        </div> */}
      </div>
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-start justify-center z-50"
          onClick={handleCloseFullscreen}
        >
          <div className="max-w-full h-screen">
            <img
              src={src}
              alt={alt}
              className="max-h-3/4 mx-auto mt-10 rounded-lg cursor-zoom-out bg-white"
            />
          </div>
          <button
            className="absolute top-5 right-5 text-black text-3xl font-bold hover:text-gray-500 transition"
            onClick={handleCloseFullscreen}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default FullscreenImage;
