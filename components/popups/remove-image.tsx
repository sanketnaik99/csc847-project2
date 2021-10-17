import React from "react";
import Popup from "reactjs-popup";
import { Picture } from "../../pages";

interface Props {
  onClose: Function;
  onRemove: Function;
  picture: Picture;
}

const RemoveImage: React.FC<Props> = ({ onClose, onRemove, picture }) => {
  return (
    <Popup
      trigger={
        <div className="edit-button bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Delete Image
        </div>
      }
      modal
      onClose={() => onClose()}
    >
      {(close: any) => (
        <div>
          <div className="p-4 w-full">
            <div>
              <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-700">
                Delete Image
              </h1>
              <p className="text-center text-lg font-medium mt-3">
                Are you sure you want to delete this image?
              </p>
              {picture.imageURL ? (
                <img
                  src={picture.imageURL}
                  className="w-64 mx-auto border mt-4 rounded-xl overflow-hidden"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-row justify-around w-full mb-4">
            <div
              className="edit-button bg-gray-500"
              onClick={() => {
                close();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              No, Cancel
            </div>
            <div
              className="edit-button bg-red-500"
              onClick={() => {
                onRemove();
                close();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Yes, Delete
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default RemoveImage;
