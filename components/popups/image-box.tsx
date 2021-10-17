import React from "react";
import Popup from "reactjs-popup";

interface Props {
  src: string;
  alt: string;
}

const ImageBox: React.FC<Props> = ({ src, alt }) => {
  return (
    <Popup
      trigger={
        <img
          src={src}
          alt={alt}
          className="border-b border-gray-200 cursor-pointer"
        />
      }
      modal
    >
      {(close: any) => (
        <div className="relative p-3">
          <div
            className="absolute right-4 top-4 p-2 rounded-xl bg-gray-100 text-gray-600 cursor-pointer"
            onClick={() => close()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <img src={src} alt={alt} className="w-full" width={"100%"} />
        </div>
      )}
    </Popup>
  );
};

export default ImageBox;
