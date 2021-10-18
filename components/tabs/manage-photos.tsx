import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import image from "next/image";
import EditMetadata from "../popups/edit-metadata";
import { Picture } from "../../pages";
import RemoveImage from "../popups/remove-image";
import { deleteObject, getStorage, ref } from "@firebase/storage";
import { FirebaseApp } from "@firebase/app";
import ReplaceImage from "../popups/replace-image";
import LabelBadge from "../label";

interface Props {
  firebaseApp: FirebaseApp;
}

const ManagePhotos: React.FC<Props> = ({ firebaseApp }) => {
  const db = getFirestore();
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [modalClosed, setModalClosed] = useState(true);

  const storage = getStorage(firebaseApp);

  useEffect(() => {
    fetchData();
  }, [modalClosed]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Picture"));
    let pictureData: Picture[] = [];
    querySnapshot.forEach((doc) => {
      let parsed = doc.data() as Picture;
      parsed.dateParsed = new Date(parsed.imageDate);
      pictureData.push(parsed);
    });
    // console.log(pictureData);
    setPictures(pictureData);
  };

  const deleteImage = async (picture: Picture) => {
    await deleteDoc(doc(db, "Picture", `${picture.filename.split("/")[1]}`));
    const imageRef = ref(storage, picture.filename);
    deleteObject(imageRef)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="header flex flex-row justify-center mt-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-700">
          Manage Photos
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
                <LabelBadge label={picture.label} />
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
              <div className="flex flex-col items-center lg:items-end">
                <EditMetadata
                  picture={picture}
                  onClose={() => setModalClosed(!modalClosed)}
                />
                <ReplaceImage picture={picture} storage={storage} />
                <RemoveImage
                  onClose={() => setModalClosed(!modalClosed)}
                  onRemove={() => deleteImage(picture)}
                  picture={picture}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePhotos;
