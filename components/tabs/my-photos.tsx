import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import image from "next/image";

interface Picture {
  created: string;
  filename: string;
  imageDate: string;
  imageURL: string;
  label: string;
  location: string;
  photographerName: string;
  dateParsed?: Date;
}

const MyPhotos = () => {
  const db = getFirestore();
  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Picture"));
    let pictureData: Picture[] = [];
    querySnapshot.forEach((doc) => {
      let parsed = doc.data() as Picture;
      parsed.dateParsed = new Date(parsed.imageDate);
      pictureData.push(parsed);
    });
    console.log(pictureData);
    setPictures(pictureData);
  };

  return (
    <div>
      <div className="header flex flex-row justify-center mt-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-700">
          My PhotoBook
        </h1>
      </div>

      <div className="mt-8 mb-8 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {pictures.map((picture) => (
          <div
            key={picture.filename}
            className="rounded-xl shadow-lg overflow-hidden bg-white"
          >
            <img
              src={picture.imageURL}
              alt={picture.filename}
              className="border-b border-gray-200"
            />
            <div className="p-4">
              <div className="mb-3">
                <span className="text-sm font-semibold inline-block py-1 px-3 uppercase rounded-full text-blue-500 bg-blue-200">
                  {picture.label}
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-600">
                {picture.photographerName} - {picture.location}
              </h4>
              <h5 className="text-lg font-semibold text-gray-500">
                Date:{" "}
                {picture.dateParsed?.getDate()
                  ? picture.dateParsed?.getDate() + 1
                  : 0}
                /{picture.dateParsed?.getMonth()}/
                {picture.dateParsed?.getFullYear()}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPhotos;
