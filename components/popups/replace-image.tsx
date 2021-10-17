import { FirebaseStorage, ref, uploadBytesResumable } from "@firebase/storage";
import { async } from "@firebase/util";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Picture } from "../../pages";

interface Props {
  picture: Picture;
  storage: FirebaseStorage;
}

const ReplaceImage: React.FC<Props> = ({ picture, storage }) => {
  const [newImage, setNewImage] = useState<File | null>();
  const [newImagePreview, setNewImagePreview] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [uploadProgress, setProgress] = useState(0);

  const replaceImage = async (picture: Picture, close: any) => {
    setLoading(true);
    const imageRef = ref(storage, picture.filename);
    if (newImage) {
      const uploadTask = uploadBytesResumable(imageRef, newImage, {
        customMetadata: {
          photographerName: picture.photographerName,
          location: picture.location,
          imageDate: picture.imageDate,
        },
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          // console.log("Upload Progress => ", progress, "%");
        },
        (error) => {
          setLoading(false);
          console.log(error);
        },
        () => {
          console.log("Success");
          setLoading(false);
          close();
        }
      );
    }
    return;
  };

  return (
    <Popup
      trigger={
        <div className="edit-button bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Replace Image
        </div>
      }
      modal
    >
      {(close: any) => (
        <div>
          <div>
            <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-700">
              Replace Image
            </h1>
            <p className="text-center text-lg font-medium mt-3">
              The following image will be replaced by any image that you upload.
            </p>
            {picture.imageURL ? (
              <img
                src={picture.imageURL}
                className="w-64 mx-auto border mt-4 rounded-xl overflow-hidden"
              />
            ) : null}
          </div>
          <div className="relative mt-4 mx-auto">
            <label className="mx-auto w-64 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white text-blue-600 ease-linear transition-all duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Upload an Image
              </span>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                className="hidden"
                onChange={(event) => {
                  setNewImage(
                    event.currentTarget.files
                      ? event.currentTarget.files[0]
                      : new File([""], "image.jpg")
                  );
                  if (event.target.files) {
                    setNewImagePreview(
                      URL.createObjectURL(event.target.files[0])
                    );
                  }
                }}
              />
            </label>
          </div>
          {newImagePreview ? (
            <img
              src={newImagePreview}
              className="w-64 mx-auto border mt-4 rounded-xl overflow-hidden"
            />
          ) : null}
          {isLoading ? (
            <div className="relative pt-4 px-4 md:px-12">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-500 bg-blue-200">
                    Task in progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-500">
                    {uploadProgress.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          ) : null}
          <div className="flex flex-row justify-around mt-4 mb-4">
            <div
              className="edit-button bg-gray-500 mx-1"
              onClick={() => {
                setNewImage(null);
                setNewImagePreview("");
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
              Cancel
            </div>
            <div
              className="edit-button bg-green-600 mx-1"
              onClick={async () => {
                await replaceImage(picture, close);
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
              Replace
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ReplaceImage;
