import type { NextPage } from "next";
import { useState } from "react";
import ManagePhotos from "../components/tabs/manage-photos";
import MyPhotos from "../components/tabs/my-photos";
import UploadPhoto from "../components/tabs/upload-photo";
import PhotoBook from "../public/assets/photo-album.png";
import Image from "next/image";
import { initializeApp } from "@firebase/app";

const UPLOAD_PHOTO_TAB = "upload-photo";
const MY_PHOTOBOOK_TAB = "my-photobook";
const MANAGE_PHOTOS_TAB = "manage-photos";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export interface Picture {
  created: string;
  filename: string;
  imageDate: string;
  imageURL: string;
  label: string;
  location: string;
  photographerName: string;
  dateParsed?: Date;
}

const Home: NextPage = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const [currentTab, setCurrentTab] = useState(UPLOAD_PHOTO_TAB);

  return (
    <main>
      <div className="flex flex-row justify-between md:px-5 py-4 px-2 flex-wrap">
        <div className="flex flex-row items-center mb-2">
          <Image
            src={PhotoBook}
            placeholder="blur"
            height={50}
            width={50}
            className="p-1"
            alt="PhotoBook Logo"
          />
          <h1 className="ml-3 text-2xl md:text-4xl font-bold md:font-black text-gray-700">
            PhotoBook
          </h1>
        </div>
        <div className="flex sm:flex-row flex-col justify-center items-center">
          <div
            className={[
              "tab-button",
              currentTab == UPLOAD_PHOTO_TAB ? "bg-blue-700" : "bg-blue-500",
            ].join(" ")}
            onClick={() => setCurrentTab(UPLOAD_PHOTO_TAB)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2">Upload Photo</p>
          </div>
          <div
            className={[
              "tab-button",
              currentTab == MY_PHOTOBOOK_TAB ? "bg-blue-700" : "bg-blue-500",
            ].join(" ")}
            onClick={() => setCurrentTab(MY_PHOTOBOOK_TAB)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2">My PhotoBook</p>
          </div>
          <div
            className={[
              "tab-button",
              currentTab == MANAGE_PHOTOS_TAB ? "bg-blue-700" : "bg-blue-500",
            ].join(" ")}
            onClick={() => setCurrentTab(MANAGE_PHOTOS_TAB)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2">Manage Photos</p>
          </div>
        </div>
      </div>
      <div>
        {currentTab === UPLOAD_PHOTO_TAB ? (
          <UploadPhoto firebaseApp={firebaseApp} />
        ) : currentTab === MY_PHOTOBOOK_TAB ? (
          <MyPhotos />
        ) : currentTab === MANAGE_PHOTOS_TAB ? (
          <ManagePhotos firebaseApp={firebaseApp} />
        ) : null}
      </div>
    </main>
  );
};

export default Home;
