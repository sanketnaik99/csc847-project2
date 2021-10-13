import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { object, string, mixed } from "yup";

interface FormValues {
  photographerName: string;
  location: string;
  imageDate: string;
  imageFile?: File;
}

const UploadPhoto = () => {
  const [previewImage, setPreviewImage] = useState("");

  const initialValues: FormValues = {
    photographerName: "",
    location: "",
    imageDate: `${new Date(Date.now()).getFullYear()}-${
      new Date(Date.now()).getMonth() + 1
    }-${new Date(Date.now()).getDate()}`,
  };

  const validationSchema = object().shape({
    photographerName: string()
      .required("The photographer's name is required")
      .min(2, "Please enter a valid name."),
    location: string()
      .required("The photograph's location is required")
      .min(2, "Please enter a valid location."),
    imageDate: string().required("The photograph's date is required."),
    imageFile: mixed().required("Please upload a photograph."),
  });

  return (
    <div className="mt-10 lg:w-1/2 md:w-3/4 mx-auto px-3">
      <div>
        <h1 className="text-center text-2xl md:text-4xl font-bold">
          Upload a Photo
        </h1>
        <p className="text-center text-lg font-medium mt-3">
          Fill out the form below to upload a photo to the photobook.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          actions.setSubmitting(false);
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="mt-6">
            <div className="relative">
              <label
                htmlFor="photographerName"
                className="leading-7 text-sm text-gray-600"
              >
                Photographer's Name
              </label>
              <Field
                type="text"
                id="photographerName"
                name="photographerName"
                className="input-field"
              />
              {errors.photographerName && touched.photographerName ? (
                <div className="error-message">{errors.photographerName}</div>
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
            {previewImage ? (
              <img
                src={previewImage}
                className="w-64 mx-auto border mt-4 rounded-xl overflow-hidden"
              />
            ) : null}
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
                    setFieldValue(
                      "imageFile",
                      event.currentTarget.files
                        ? event.currentTarget.files[0]
                        : null
                    );
                    if (event.target.files) {
                      setPreviewImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }
                  }}
                />
              </label>
              {errors.imageFile ? (
                <div className="error-message text-center mt-3">
                  {errors.imageFile}
                </div>
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
  );
};

export default UploadPhoto;
