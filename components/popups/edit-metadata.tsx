import { Field, Form, Formik } from "formik";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { object, string } from "yup";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { Picture } from "../../pages";

interface Props {
  picture: Picture;
  onClose: Function;
}

interface FormValues {
  photographerName: string;
  location: string;
  imageDate: string;
  imageFile?: File;
  label: string;
}

const EditMetadata: React.FC<Props> = ({ picture, onClose }) => {
  const initialValues: FormValues = {
    photographerName: picture.photographerName,
    location: picture.location,
    imageDate: picture.imageDate,
    label: picture.label,
  };

  const validationSchema = object().shape({
    photographerName: string()
      .required("The photographer's name is required")
      .min(2, "Please enter a valid name."),
    location: string()
      .required("The photograph's location is required")
      .min(2, "Please enter a valid location."),
    imageDate: string().required("The photograph's date is required."),
    label: string()
      .required("A label is required")
      .min(2, "Please enter a valid label"),
  });

  const db = getFirestore();

  const editPhoto = async (values: FormValues, close: any) => {
    const docRef = doc(db, "Picture", picture.filename.split("/")[1]);
    await updateDoc(docRef, {
      photographerName: values.photographerName,
      location: values.location,
      imageDate: values.imageDate,
      label: values.label,
    });
    close();
  };

  return (
    <Popup
      trigger={
        <div className="edit-button bg-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Metadata
        </div>
      }
      modal
      className="w-full"
      onClose={() => onClose()}
    >
      {(close: any) => (
        <div className="p-4 w-full">
          <div>
            <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-700">
              Edit Photo Details
            </h1>
            <p className="text-center text-lg font-medium mt-3">
              Fill out the form below to edit the photo&#39;s details.
            </p>
            {picture.imageURL ? (
              <img
                src={picture.imageURL}
                className="w-64 mx-auto border mt-4 rounded-xl overflow-hidden"
              />
            ) : null}
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              actions.setSubmitting(false);
              editPhoto(values, close);
            }}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="mt-6">
                <div className="relative">
                  <label
                    htmlFor="photographerName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Photographer&#39;s Name
                  </label>
                  <Field
                    type="text"
                    id="photographerName"
                    name="photographerName"
                    className="input-field"
                  />
                  {errors.photographerName && touched.photographerName ? (
                    <div className="error-message">
                      {errors.photographerName}
                    </div>
                  ) : null}
                </div>
                <div className="relative">
                  <label
                    htmlFor="location"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Location
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="input-field"
                  />
                  {errors.location && touched.location ? (
                    <div className="error-message">{errors.location}</div>
                  ) : null}
                </div>
                <div className="relative">
                  <label
                    htmlFor="label"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Label
                  </label>
                  <Field
                    type="text"
                    id="label"
                    name="label"
                    className="input-field"
                  />
                  {errors.label && touched.label ? (
                    <div className="error-message">{errors.label}</div>
                  ) : null}
                </div>
                <div className="relative">
                  <label
                    htmlFor="imageDate"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Date
                  </label>
                  <Field
                    type="date"
                    id="imageDate"
                    name="imageDate"
                    className="input-field"
                  />
                  {errors.imageDate && touched.imageDate ? (
                    <div className="error-message">{errors.imageDate}</div>
                  ) : null}
                </div>
                <div className="flex flex-row justify-center">
                  <button
                    type="submit"
                    className="submit-button py-3 bg-blue-500 text-white font-bold px-8 rounded-lg text-lg mt-8"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Popup>
  );
};

export default EditMetadata;
