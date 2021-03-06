import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field } from "formik";
import User from "./renderProps/User";
import ErrorMessage from "./ErrorMessage";
import { createPost } from "../actions";
const NewPost = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleImageUpload = async (event, setFieldValue) => {
    if (event.target.value) {
      // https://www.pluralsight.com/guides/how-to-create-a-simple-form-submit-with-files  , https://developer.mozilla.org/en-US/docs/Web/API/FileList ,   https://javascript.info/formdata
      const files = event.target.files;
      console.log(files[0]);
      const data = new FormData();

      data.append("file", files[0]);
      data.append("upload_preset", "sickfits");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();
      // https://hackernoon.com/formik-handling-files-and-recaptcha-209cbeae10bc
      setFieldValue("image", file.secure_url);
      setFieldValue("largeImage", file.eager[0].secure_url);
    } else {
      setFieldValue("image", "");
      setFieldValue("largeImage", "");
    }
  };
  return (
    <div className="new__post">
      <h2 className="new__post-heading heading-secondary">Create new post</h2>

      <Formik
        initialValues={{ image: "", largeImage: "", title: "", body: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "You forgot to enter a title";
          } else if (values.title.length > 4 || values.title.length === 0) {
            errors.title = "1 to 4 chars";
          }

          if (!values.body) {
            errors.body = "You forgot to write your post";
          } else if (values.body.length > 20 || values.body.length < 10) {
            errors.body = "Your post is either too long or too short";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { title, body, image, largeImage } = values;
          dispatch(
            createPost(
              {
                title,
                body,
                image,
                largeImage,
              },
              history
            )
          );
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="new__post-form">
            <div className="new__post-form-field new__post-form-field-title">
              <label
                htmlFor="title"
                className="new__post-form-field-title-label"
              >
                Title
              </label>
              <div className="new__post-form-field-title-div">
                <input
                  className={`new__post-form-field-title-div-input ${
                    errors.title ? "input-error" : ""
                  }`}
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  autoComplete="off"
                />
                <p className="new__post-form-field-title-div-error">
                  {errors.title && touched.title && errors.title}
                </p>
              </div>
            </div>

            <div className="new__post-form-field new__post-form-field-image">
              <label
                htmlFor="image"
                className="new__post-form-field-image-label"
              >
                Image
              </label>

              <div className="new__post-form-field-image-div">
                <div className="new__post-form-field-image-div-button">
                  <label
                    className="new__post-form-field-image-div-button-label"
                    htmlFor="image"
                  >
                    Upload File
                  </label>
                  <input
                    type="file"
                    className="new__post-form-field-image-div-button-input"
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Upload an image"
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="new__post-form-field-image-div-preview">
                  {values.image && (
                    <>
                      <img
                        className="new__post-form-field-image-div-preview-img"
                        src={values.image}
                        alt="Upload Preview"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          console.log("btn pressed");
                          handleImageUpload(e, setFieldValue);
                        }}
                        className="new__post-form-field-image-div-preview-cancel"
                      >
                        X
                      </button>
                    </>
                  )}
                </div>

                {/* <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Upload an image"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                  onBlur={handleBlur}
                  className="new__post-form-field-image-input"
                /> */}
                {/* <div className="new__post-form-field-image-div-preview">
                  {values.image && (
                    <img className="new__post-form-field-image-div-preview-img" src={values.image} alt="Upload Preview" />
                  )}
                </div> */}
              </div>
            </div>
            <div className="new__post-form-field new__post-form-field-body">
              <label htmlFor="body" className="new__post-form-field-body-label">
                Your post
              </label>
              <div className="new__post-form-field-body-div">
                <textarea
                  name="body"
                  id="body"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                  className={`new__post-form-field-body-div-input ${
                    errors.body ? "input-error" : " "
                  }`}
                />

                <p className="new__post-form-field-body-div-error">
                  {errors.body && touched.body && errors.body}
                </p>
              </div>
            </div>
            <div className="new__post-form-field-buttons">
              <button
                type="button"
                onClick={() => history.goBack()}
                className="new__post-form-field-cancel-btn btn btn-danger btn-medium"
              >
                cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="new__post-form-field-submit-btn btn btn-medium btn-go"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>

      {/* <form
        action=""
        className="new__post-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            createPost(
              {
                title: "created from action",
                body: "sldjfalksjdflaksdjflksdjf",
              },
              history
            )
          );
        }}
      >
        <div className="new__post-form-field new__post-form-field-title">
          <label htmlFor="title" className="new__post-form-field-title-label">
            Title
          </label>
          <input type="text" className="new__post-form-field-title-input" />
        </div>
        <button type="submit" className="new__post-form-submit">
          Submit
        </button>
      </form> */}
    </div>
  );
};

export default NewPost;

{
  /* <input
                    id="upload"
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Upload an image"
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                    onBlur={handleBlur}
                    className="new__post-form-field-image-div-button-input"
                  /> */
}

{
  /* <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Upload an image"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                  onBlur={handleBlur}
                  className="new__post-form-field-image-input"
                /> */
}

{
  /* <div className="new__post-form-field-image-div">
                  {values.image && (
                    <img width="150" src={values.image} alt="Upload Preview" />
                  )}
                </div> */
}
