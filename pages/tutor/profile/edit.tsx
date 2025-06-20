import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TutorDashboardLayout from "layouts/TutorDashboard";
import withAuthNew from "HOC/withAuthNew";
import useTutorProfile from "@/tutor/hooks/useTutorProfile";
import ImageUploading from "react-images-uploading";
import React, { useEffect, useState, useRef } from "react";
import useUpdateProfiePicture from "@/tutor/hooks/useUpdateProfilePicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faLeaf,
  faUpload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import Select from "react-select";
import useInitialFormData from "@/tutor/hooks/useInitialFormData";
import { useRouter } from "next/router";
import useUpdateProfile from "@/tutor/hooks/useUpdateProfile";
import { genderOptions } from "consts/genders";
import { customStyles } from "@/tutor/components/CompleteProfile/styles";
import TutorProfilePage from "layouts/TutorProfilePage";
import DoneIcon from "@mui/icons-material/Done";
import useUpdateProfileVideo from "@/tutor/hooks/useUpdateProfileVideo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { api } from "../../../api";
import { useQuery } from "react-query";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectStudentTutorProfile } from "features/students/TutorProfileSlice";

const PAGE_PERMISSION_ROLE = "tutor";
const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required").nullable(),
});

// Initial form value

function Profile() {
  const [images, setImages] = useState<any>([]);
  const [video, setVideo] = useState<any>([]);
  const [value, setValue] = useState<any>("");
  const [promptOpen, setPromptOpen] = useState<boolean>(false);
  const [promptCancel, setPromptCancel] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [isVideoUploading, setIsVideoUploading] = useState<any>(false);
  const [imageId, setImageId] = useState<number>();
  const [videoId, setVideoId] = useState<number>();
  const userProfile = useTutorProfile();
  // const profile = useSelector(selectStudentTutorProfile);
  const updateProfilePicture = useUpdateProfiePicture(setImageId);
  const updateProfileVideo = useUpdateProfileVideo(
    setVideoId,
    setIsVideoUploading
  );
  const updateProfile = useUpdateProfile();
  const initialFormData = useInitialFormData();
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const allCountries = useQuery("allCountries", () =>
    api.get("/countries").then((res) => res.data)
  );

  // console.log("profile data edit page =====>", userProfile);

  useEffect(() => {
    getInitialFormData();
  }, [userProfile.data]);

  const getInitialFormData = () => {
    if (!userProfile.data) return;
    const { data } = userProfile;
    console.log(data);

    setInitialValues({
      name: data?.fullname,
      image_url: data?.imageUrl,
      address: data?.tutor_details.address,
      description: data?.tutor_details.description,
      email: data?.email,
      phone: data?.phone || "9102322",
      country: { label: data?.country?.name, value: data?.country?.id },
      timezone: { label: data?.timezone, value: data?.timezone },
      gender: {
        label: data?.tutor_details?.gender,
        value: data?.tutor_details?.gender,
      },
      experienceYears: data?.tutor_details?.experience,
      disciplines: data?.discipline.map((item: any) => ({
        label: item.name,
        value: item.id,
      })),
      subjects: data?.subjects.map((item: any) => ({
        label: item.name,
        value: item.id,
      })),
      knownLanguages: data?.languages.map((item: any) => ({
        label: item.name,
        value: item.id,
      })),
      hourlyCharges: data?.tutor_details?.hourly_charge,
    });
  };
  const onChange = (imageList: any, addUpdateIndex: any) => {
    setPromptOpen(false);
    setImages(imageList);

    var formData = new FormData();
    formData.append("files", imageList[0]?.file);
    updateProfilePicture.mutate(formData);
  };
  const handleUpdateProfilePicture = () => {
    setPromptOpen(false);
    var formData = new FormData();
    formData.append("files", images[0]?.file);
    updateProfilePicture.mutate(formData);
  };
  const handleUpdateProfileVideo = (e: any) => {
    setIsVideoUploading(true);
    const file = e.target.files[0];
    var formData = new FormData();
    formData.append("files", file);
    updateProfileVideo.mutate(formData);
  };
  const handleInputTypeFile = () => {
    inputEl.current?.click();
  };
  const handleSubmit = (values: any) => {
    const data = {
      fullname: values.name,
      email: values.email,
      phone: values.phone,
      description: values?.description,
      country_id: parseInt(values.country.value),
      country_code: parseInt(values.country.value),
      timezone: values.timezone.value,
      experience: Number(values.experienceYears),
      address: values.address,
      subjects: values.subjects.map((item: any) => Number(item.value)),
      languages: values.knownLanguages.map((item: any) => Number(item.value)),
      disciplines: values.disciplines.map((item: any) => Number(item.value)),
      hourly_charge: values.hourlyCharges,
      video: videoId,
    };
    if (!promptOpen) {
      updateProfile.mutate(data);
    }
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TutorProfilePage>
        {initialValues && (
          <Formik
            initialValues={initialValues}
            validationSchema={EditProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, isValid, dirty }) => {
              return (
                <Form>
                  <div className="d-flex justify-content-between"></div>
                  <div>
                    <div className="row">
                      <div className="col-12 py-4 px-5 d-flex align-items-end justify-content-between">
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
                                {imageList.length === 0 ? (
                                  <>
                                    <img
                                      src={userProfile.data?.image_url}
                                      height={"100px"}
                                      // onClick={onImageUpload}
                                      className="edit-profile__profile__image"
                                      {...dragProps}
                                    />
                                    <button
                                      style={{
                                        border: "none",
                                        backgroundColor: "white",
                                        borderRadius: "50px",
                                        boxShadow: " 0px 3px 6px #0000001A",
                                        position: "absolute",
                                        left: "60px",
                                      }}
                                      onClick={() => {
                                        setPromptOpen(true);
                                        onImageUpload();
                                      }}
                                    >
                                      <img
                                        src="/icons/camera.svg"
                                        style={{
                                          width: "15px",
                                          height: "13px",
                                        }}
                                      />
                                    </button>
                                  </>
                                ) : (
                                  imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                      <img
                                        alt=""
                                        width="100"
                                        // onClick={() => onImageUpdate(index)}
                                        // onChange={handleUpdateProfilePicture}
                                        className="edit-profile__profile__image"
                                        {...dragProps}
                                      />
                                      <button
                                        style={{
                                          border: "none",
                                          backgroundColor: "white",
                                          borderRadius: "50px",
                                          boxShadow: " 0px 3px 6px #0000001A",
                                          position: "absolute",
                                          left: "60px",
                                        }}
                                        // onClick={()=>onImageUpdate(index)}
                                      >
                                        <img
                                          src="/icons/camera.svg"
                                          style={{
                                            width: "15px",
                                            height: "13px",
                                          }}
                                          onClick={() => {
                                            setPromptOpen(true);
                                            onImageUpdate(index);
                                          }}
                                          // onChange={handleUpdateProfilePicture}
                                        />
                                      </button>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </ImageUploading>
                          <div className="me-1 d-flex align-items-end">
                            <div className="ms-3">
                              <input
                                ref={inputEl}
                                type="file"
                                onChange={(e) => handleUpdateProfileVideo(e)}
                                accept=".mov,.mp4"
                                style={{ display: "none" }}
                              />
                              <div
                                onClick={handleInputTypeFile}
                                className="btn-sm btn-brand px-2 ms-5 mb-2"
                                style={{ cursor: "pointer", width: "180px" }}
                                // disabled={images.length === 0}    padding: 4px 11px;
                              >
                                {isVideoUploading ? (
                                  <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="me-2"
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faUpload}
                                    className="me-2"
                                  />
                                )}
                                Update Profile Video
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="btn btn-default mb-2"
                            style={{
                              backgroundColor: "#FBB017",
                              borderColor: "#FBB017",
                              padding: "4px 11px",
                            }}
                          >
                            <span style={{ color: "white" }}>Save</span>
                            <DoneIcon
                              sx={{
                                color: "white",
                                marginLeft: "10px",
                                marginBottom: "5px",
                              }}
                            />{" "}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className=" py-4 px-4 ">
                      <ReactPlayer
                        width="50%"
                        height="50%"
                        controls
                        url={userProfile ? userProfile?.data.video : ""}
                        // url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
                      />
                    </div>

                    <div className="row">
                      <div className=" py-4 px-5 ">
                        <div className="col-12">
                          <div className="row">
                            <div
                              className="col-12 col-sm-4 "
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label"> Name</div>
                              <Field
                                type="name"
                                name="name"
                                id="name"
                                className={`edit-profile__field__input__text ${
                                  errors.name && touched.name
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                {" "}
                                Email
                              </div>
                              <Field
                                type="email"
                                name="email"
                                id="email"
                                className={`edit-profile__field__input__text ${
                                  errors.email && touched.email
                                    ? "input-error"
                                    : null
                                }`}
                                disabled
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                                pointerEvents: "none",
                              }}
                            >
                              <div className="profile__field__label">
                                Phone Number
                              </div>
                              <Field
                                type="number"
                                name="phone"
                                id="phone"
                                className={`edit-profile__field__input__text ${
                                  errors.phone && touched.phone
                                    ? "input-error"
                                    : null
                                }`}
                                disabled
                              >
                                {({ field, form: { setFieldValue } }: any) => (
                                  <PhoneInput
                                    country={"us"}
                                    value={field.value.toString()}
                                    onChange={(val) => {
                                      setFieldValue(field.name, val || "");
                                    }}
                                    onBlur={field.onBlur}
                                    inputStyle={{
                                      width: "405px",
                                      borderRadius: "12px",
                                    }}
                                    buttonStyle={{
                                      borderTopLeftRadius: "12px",
                                      borderBottomLeftRadius: "12px",
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
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Password
                              </div>
                              <Field
                                type="name"
                                name="password"
                                id="password"
                                className={`edit-profile__field__input__text ${
                                  errors.password && touched.password
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                New Password
                              </div>
                              <Field
                                type="name"
                                name="newPassword"
                                id="newPassword"
                                className={`edit-profile__field__input__text ${
                                  errors.newPassword && touched.newPassword
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="newPassword"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4 "
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                {" "}
                                Description
                              </div>
                              <Field
                                type="name"
                                name="description"
                                id="description"
                                className={`edit-profile__field__input__text ${
                                  errors.description && touched.description
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="error"
                              />
                            </div>
                            {/* <div className="col-12 col-sm-4"></div> */}
                            <div
                              className="col-12 col-sm-4 "
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                {" "}
                                Address
                              </div>
                              <Field
                                type="name"
                                name="address"
                                id="address"
                                className={`edit-profile__field__input__text ${
                                  errors.address && touched.address
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Country
                              </div>
                              <div className="profile__field__value">
                                <Field name="country">
                                  {({
                                    field,
                                    form: {
                                      touched,
                                      setFieldValue,
                                      setTouched,
                                    },
                                  }: any) => (
                                    <div className="mb-3">
                                      <Select
                                        instanceId="country-select"
                                        options={allCountries?.data?.result
                                          .sort((a: any, b: any) =>
                                            a.name > b.name ? 1 : -1
                                          )
                                          .map((country: any) => ({
                                            label: country.name,
                                            value: country.name,
                                          }))}
                                        onChange={(value: any) => {
                                          setFieldValue(field.name, value);
                                        }}
                                        styles={customStyles}
                                        defaultValue={initialValues.country}
                                        isMulti={false}
                                        onBlur={() =>
                                          setTouched({
                                            ...touched,
                                            [field.name]: true,
                                          })
                                        }
                                        menuPlacement="top"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="country"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Timezone
                              </div>
                              <Field name="timezone">
                                {({
                                  field,
                                  form: { touched, setFieldValue, setTouched },
                                }: any) => (
                                  <div className="mb-3">
                                    <Select
                                      instanceId="timezone-select"
                                      options={initialFormData?.data?.timezone.map(
                                        (item: any) => ({
                                          label: item,
                                          value: item,
                                        })
                                      )}
                                      defaultValue={initialValues.timezone}
                                      styles={customStyles}
                                      isLoading={initialFormData.isFetching}
                                      onChange={(value: any) => {
                                        setFieldValue(field.name, value);
                                      }}
                                      isMulti={false}
                                      onBlur={() =>
                                        setTouched({
                                          ...touched,
                                          [field.name]: true,
                                        })
                                      }
                                      menuPlacement="top"
                                    />
                                  </div>
                                )}
                              </Field>
                              <ErrorMessage
                                name="timezone"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Experience (year(s))
                              </div>

                              <Field
                                type="name"
                                name="experienceYears"
                                id="experienceYears"
                                className={`edit-profile__field__input__text  ${
                                  errors.experienceYears &&
                                  touched.experienceYears
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="experienceYears"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Disciplines
                              </div>
                              <div className="profile__field__value">
                                <Field name="disciplines">
                                  {({
                                    field,
                                    form: {
                                      touched,
                                      setFieldValue,
                                      setTouched,
                                    },
                                  }: any) => (
                                    <div className="mb-3">
                                      <Select
                                        instanceId="disciplines-select"
                                        options={initialFormData?.data?.disciplines.map(
                                          (item: any) => ({
                                            label: item.name,
                                            value: item.id,
                                          })
                                        )}
                                        styles={customStyles}
                                        isLoading={initialFormData.isFetching}
                                        onChange={(value: any) => {
                                          setFieldValue(field.name, value);
                                        }}
                                        defaultValue={initialValues.disciplines}
                                        isMulti={true}
                                        onBlur={() =>
                                          setTouched({
                                            ...touched,
                                            [field.name]: true,
                                          })
                                        }
                                        menuPlacement="top"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="disciplines"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Subjects
                              </div>
                              <div className="profile__field__value">
                                <Field name="subjects">
                                  {({
                                    field,
                                    form: {
                                      touched,
                                      setFieldValue,
                                      setTouched,
                                    },
                                  }: any) => (
                                    <div className="mb-3">
                                      <Select
                                        instanceId="subjects-select"
                                        options={initialFormData?.data?.subjects.map(
                                          (item: any) => ({
                                            label: item.name,
                                            value: item.id,
                                          })
                                        )}
                                        styles={customStyles}
                                        isLoading={initialFormData.isFetching}
                                        onChange={(value: any) => {
                                          setFieldValue(field.name, value);
                                        }}
                                        defaultValue={initialValues.subjects}
                                        isMulti={true}
                                        onBlur={() =>
                                          setTouched({
                                            ...touched,
                                            [field.name]: true,
                                          })
                                        }
                                        menuPlacement="top"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="subjects"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                {" "}
                                Gender
                              </div>
                              <div className="profile__field__value">
                                <Field name="gender">
                                  {({
                                    field,
                                    form: {
                                      touched,
                                      setFieldValue,
                                      setTouched,
                                    },
                                  }: any) => (
                                    <div className="mb-3">
                                      <Select
                                        instanceId="gender-select"
                                        options={genderOptions}
                                        styles={customStyles}
                                        isLoading={initialFormData.isFetching}
                                        onChange={(options: any) => {
                                          setFieldValue(field.name, options);
                                        }}
                                        defaultValue={initialValues.gender}
                                        isMulti={false}
                                        onBlur={() =>
                                          setTouched({
                                            ...touched,
                                            [field.name]: true,
                                          })
                                        }
                                        menuPlacement="top"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="gender"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Hourly charge
                              </div>

                              <Field
                                type="name"
                                name="hourlyCharges"
                                id="hourlyCharges"
                                className={`edit-profile__field__input__text  ${
                                  errors.experienceYears &&
                                  touched.experienceYears
                                    ? "input-error"
                                    : null
                                }`}
                              />
                              <ErrorMessage
                                name="hourlyCharges"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div
                              className="col-12 col-sm-4"
                              style={{
                                width: "330px",
                                height: "100px",
                              }}
                            >
                              <div className="profile__field__label">
                                Known languages
                              </div>
                              <div className="profile__field__value">
                                {/* ${data?.tutor_details?.hourly_charge} */}
                                <Field name="knownLanguages">
                                  {({
                                    field,
                                    form: {
                                      touched,
                                      setFieldValue,
                                      setTouched,
                                    },
                                  }: any) => (
                                    <div className="mb-3">
                                      <Select
                                        instanceId="disciplines-select"
                                        options={initialFormData?.data?.languages.map(
                                          (item: any) => ({
                                            label: item.name,
                                            value: item.id,
                                          })
                                        )}
                                        styles={customStyles}
                                        isLoading={initialFormData.isFetching}
                                        onChange={(value: any) => {
                                          setFieldValue(field.name, value);
                                        }}
                                        defaultValue={
                                          initialValues.knownLanguages
                                        }
                                        isMulti={true}
                                        onBlur={() =>
                                          setTouched({
                                            ...touched,
                                            [field.name]: true,
                                          })
                                        }
                                        menuPlacement="top"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="knownLanguages"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </TutorProfilePage>
    </>
  );
}

export default withAuthNew(Profile, PAGE_PERMISSION_ROLE);
