import Header from "@/student/components/Header";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withAuthNew from "../../../HOC/withAuthNew";
import useStudentProfile from "@/student/hooks/useStudentProfile";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import {
  fetchDesciplines,
  fetchSubjects,
  selectProfile,
} from "../../../features/profile/profileSlice";
import * as Yup from "yup";
// import { selectAuth, updateProfile } from "../../../features/auth/authSlice";
import { selectAuth, updateProfile } from "../../../features/auth/authSlice";
import PhoneInput from "react-phone-input-2";
import { api, v2api } from "../../../api";
import { useQuery } from "react-query";
import DoneIcon from "@mui/icons-material/Done";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import useUpdateProfiePicture from "@/student/hooks/useUpdateProfilePicture";
import useUpdateProfile from "@/student/hooks/useUpdateProfile";
import useInitialFormData from "@/student/hooks/useInitialFormData";

import { useRouter } from "next/router";

const ProfileSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  country: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .nullable()
    .required("Country is required."),
  email: Yup.string().email().required("Email is required"),
  timezone: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .nullable()
    .required("Timezone is required."),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required").nullable(),
});

function EditProfilePageStudent() {
  const [images, setImages] = useState<any>([]);
  const [imageId, setImageId] = useState<number>();
  const { user } = useSelector(selectAuth);
  const userProfile = useStudentProfile();
  const updateProfilePicture = useUpdateProfiePicture(setImageId);
  const updateProfile = useUpdateProfile();
  const [initialValues, setInitialValues] = useState<any>(null);
  const initialFormData = useInitialFormData();
  const [picId, setPicId] = useState();

  useEffect(() => {
    if (updateProfilePicture?.data) {
      setPicId(updateProfilePicture?.data[0]?.id);
    }
  }, [updateProfilePicture?.data]);

  const inputEl = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getInitialFormData();
  }, [userProfile.data]);

  const getInitialFormData = () => {
    if (!userProfile.data) return;
    const { data } = userProfile;

    //Add the + to prefix phone
    if (data?.phone.toString().charAt(0) != "+") {
      data.phone = `+${data.phone}`;
    }

    setInitialValues({
      fullname: data?.fullName,
      email: data?.email,
      phone: data?.phone,
      address: data?.address,
      description: data?.description,
      country: { label: data?.country?.name, value: data?.country?.id },
      timezone: { label: data?.timeZone, value: data?.timeZone },
      country_code: data?.country?.country_code,
    });
    console.log(data);
  };

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
    var formData = new FormData();
    formData.append("files", imageList[0]?.file);
    updateProfilePicture.mutate(formData);
  };
  const handleUpdateProfilePicture = () => {
    var formData = new FormData();
    formData.append("files", images[0]?.file);
    updateProfilePicture.mutate(formData);
  };

  const handleInputTypeFile = () => {
    inputEl.current?.click();
  };

  const handleSubmit = (values: any) => {
    const data = {
      // ...values,
      fullName: values.fullname,
      email: values.email,
      phone: values.phone,
      countryId: parseInt(values.country.value),
      countryCode: parseInt(values.country.value),
      timezone: values.timezone.value,
      address: values.address,
      image: picId,
    };
    updateProfile.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header title={"Edit profile"} />

      <div className="container">
        <br />
        <br />
        <br />

        {initialValues && (
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Check if values are the same as initial values
              if (JSON.stringify(values) === JSON.stringify(initialValues)) {
                setSubmitting(false);
                return;
              }

              // Proceed with the update only if changes are detected
              handleSubmit(values);
            }}
          >
            {({ errors, touched, isValid, dirty }) => {
              return (
                <>
                  <div className="container">
                    <Form>
                      <div className="row">
                        <div className="col-12 py-4 px-3 d-flex align-items-end justify-content-between">
                          <div
                            className="d-flex"
                            style={{ position: "relative" }}
                          >
                            <ImageUploading
                              multiple
                              value={images}
                              onChange={onChange}
                              maxNumber={1}
                              dataURLKey="data_url"
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                dragProps,
                              }) => (
                                <div className="upload__image-wrapper">
                                  {imageList.length ? (
                                    <>
                                      {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                          <img
                                            src={image["data_url"]}
                                            alt=""
                                            width="100"
                                            onClick={() => onImageUpdate(index)}
                                            onChange={
                                              handleUpdateProfilePicture
                                            }
                                            className="edit-profile__profile__image"
                                            {...dragProps}
                                          />
                                        </div>
                                      ))}
                                    </>
                                  ) : (
                                    <div>
                                      <button
                                        style={{
                                          border: "none",
                                          backgroundColor: "white",
                                          borderRadius: "50px",
                                          boxShadow: " 0px 3px 6px #0000001A",
                                          position: "absolute",
                                          left: "60px",
                                        }}
                                        onClick={onImageUpload}
                                        // onClick={handleUpdateProfilePicture}
                                      >
                                        <img
                                          src="/icons/camera.svg"
                                          style={{
                                            width: "15px",
                                            height: "13px",
                                          }}
                                        />
                                      </button>
                                      <img
                                        src={
                                          user?.imageUrl ||
                                          "/icons/tutor/user.svg"
                                        }
                                        height={"100px"}
                                        onClick={onImageUpload}
                                        className="edit-profile__profile__image"
                                        {...dragProps}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </ImageUploading>
                            <div className="me-1 align-items-end"></div>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="btn btn-default"
                              style={{
                                backgroundColor: "#FBB017",
                                borderColor: "#FBB017",
                                color: "white",
                              }}
                            >
                              Save
                              <DoneIcon
                                sx={{
                                  color: "white",
                                  marginLeft: "10px",
                                  marginBottom: "5px",
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="p-1 form-field-3  mb-5">
                            <label htmlFor="fullname">Name</label>
                            <Field
                              type="name"
                              name="fullname"
                              id="fullname"
                              className={`${
                                errors.fullname && touched.fullname
                                  ? "input-error"
                                  : null
                              } w-100`}
                            />
                            <ErrorMessage
                              name="fullname"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                          <div className="p-1  form-field-3  mb-3">
                            <label htmlFor="country">Country</label>
                            <Field name="country">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
                              }: any) => (
                                <Select
                                  options={initialFormData?.data?.countries
                                    .sort((a: any, b: any) =>
                                      a.name > b.name ? 1 : -1
                                    )
                                    .map((country: any) => ({
                                      label: country.name,
                                      value: country.id,
                                    }))}
                                  onChange={(value: any) => {
                                    setFieldValue(field.name, value);
                                  }}
                                  defaultValue={initialValues.country}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="p-1 form-field-3 mb-3">
                            <label htmlFor="email">Email</label>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              className={`${
                                errors.fullname && touched.fullname
                                  ? "input-error"
                                  : null
                              } w-100`}
                              disabled
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                          <div className="p-1  form-field-3  mb-3">
                            <label htmlFor="email">Time Zone</label>
                            <Field name="timezone">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
                              }: any) => (
                                <Select
                                  options={initialFormData?.data?.timezones.map(
                                    (item: any) => ({
                                      label: item,
                                      value: item,
                                    })
                                  )}
                                  onChange={(value: any) => {
                                    setFieldValue(field.name, value);
                                  }}
                                  defaultValue={initialValues.timezone}
                                  className="selectProfileEdit"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="timezone"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="p-1 form-field-3  mb-3">
                            <label htmlFor="password">New Password</label>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className={`${
                                errors.fullname && touched.fullname
                                  ? "input-error"
                                  : null
                              } w-100`}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                          <div className="p-1 form-field-3  mb-3">
                            <label htmlFor="confirm_password">
                              Repeat Password
                            </label>
                            <Field
                              type="password"
                              name="confirm_password"
                              id="confirm_password"
                              className={`${
                                errors.fullname && touched.fullname
                                  ? "input-error"
                                  : null
                              } w-100`}
                            />
                            <ErrorMessage
                              name="confirm_password"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="p-1 form-field-3  mb-3 pe-none">
                            <label htmlFor="phone">Phone Number</label>
                            <Field
                              type="number"
                              name="phone"
                              id="phone"
                              className={`${
                                errors.fullname && touched.fullname
                                  ? "input-error"
                                  : null
                              } w-100`}
                              disabled
                            >
                              {({ field, form: { setFieldValue } }: any) => (
                                <PhoneInput
                                  country={"us"}
                                  value={field.value}
                                  onChange={(val) => {
                                    setFieldValue(field.name, val);
                                  }}
                                  onBlur={field.onBlur}
                                  inputStyle={{
                                    width: "100%",
                                    boxShadow: "0 3px 6px rgb(0 0 0 / 7%)",
                                    borderRadius: "8px",
                                    border: 0,
                                  }}
                                  buttonStyle={{
                                    border: 0,
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                    backgroundColor: "#fff",
                                  }}
                                  inputProps={{
                                    name: field.name,
                                  }}
                                  specialLabel=""
                                  disabled={setFieldValue}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                          <div className="p-1 form-field-3  mb-3">
                            <label htmlFor="address">Address</label>
                            <Field
                              type="name"
                              name="address"
                              id="address"
                              className={`${
                                errors.fullname && touched.fullname
                                  ? "input-error"
                                  : null
                              } w-100`}
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row d-flex mb-5"></div>

                      <div className="form-row d-flex mb-5"></div>

                      <br />
                      <br />
                    </Form>
                  </div>
                </>
              );
            }}
          </Formik>
        )}
      </div>
    </>
  );
}

export default withAuthNew(EditProfilePageStudent, "student");
