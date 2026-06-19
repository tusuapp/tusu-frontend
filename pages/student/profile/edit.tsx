import Header from "@/student/components/Header";
import Seo from "components/seo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withAuthNew from "../../../HOC/withAuthNew";
import useStudentProfile from "@/student/hooks/useStudentProfile";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { selectAuth } from "../../../features/auth/authSlice";
import PhoneInput from "react-phone-input-2";
import { v2api } from "../../../api";
import DoneIcon from "@mui/icons-material/Done";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Select from "react-select";
import useUpdateProfiePicture from "@/student/hooks/useUpdateProfilePicture";
import useUpdateProfile from "@/student/hooks/useUpdateProfile";
import useInitialFormData from "@/student/hooks/useInitialFormData";
import { useRouter } from "next/router";

const ProfileSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  country: Yup.object()
    .shape({ value: Yup.string(), label: Yup.string() })
    .nullable()
    .required("Country is required."),
  email: Yup.string().email().required("Email is required"),
  timezone: Yup.object()
    .shape({ value: Yup.string(), label: Yup.string() })
    .nullable()
    .required("Timezone is required."),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required").nullable(),
});

// react-select style overrides to match the card inputs
const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: "#faf8fb",
    border: "none",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(130,41,110,0.25), 0 2px 8px rgba(0,0,0,0.07)"
      : "0 2px 8px rgba(0,0,0,0.07)",
    borderRadius: "10px",
    minHeight: "46px",
    cursor: "pointer",
    "&:hover": { borderColor: "transparent" },
  }),
  singleValue: (base: any) => ({ ...base, color: "#333", fontSize: 14 }),
  placeholder: (base: any) => ({ ...base, color: "#aaa", fontSize: 14 }),
  menu: (base: any) => ({ ...base, borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }),
  option: (base: any, state: any) => ({
    ...base,
    fontSize: 14,
    background: state.isSelected ? "#82296e" : state.isFocused ? "#f5eff4" : "white",
    color: state.isSelected ? "white" : "#333",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

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
  const inputEl = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (updateProfilePicture?.data) {
      setPicId(updateProfilePicture?.data[0]?.id);
    }
  }, [updateProfilePicture?.data]);

  useEffect(() => {
    getInitialFormData();
  }, [userProfile.data]);

  const getInitialFormData = () => {
    if (!userProfile.data) return;
    const { data } = userProfile;
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
  };

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
    var formData = new FormData();
    formData.append("file", imageList[0]?.file);
    updateProfilePicture.mutate(formData);
  };

  const handleUpdateProfilePicture = () => {
    var formData = new FormData();
    formData.append("file", images[0]?.file);
    updateProfilePicture.mutate(formData);
  };

  const handleSubmit = (values: any) => {
    const data = {
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

  const phoneInputStyle = {
    width: "100%",
    border: 0,
    background: "#f0edf2",
    borderRadius: "10px",
    boxShadow: "none",
    color: "#888",
    fontSize: "14px",
    height: "46px",
    paddingLeft: "52px",
  };

  const phoneButtonStyle = {
    border: 0,
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    background: "#f0edf2",
  };

  return (
    <>
      <style>{`
        .ep-page { background: #f5f6fa; min-height: 100vh; padding-bottom: 60px; }
        .ep-wrap { max-width: 860px; margin: 0 auto; padding: 36px 20px; }
        .ep-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 20px rgba(130,41,110,.06); margin-bottom: 20px; overflow: hidden; }
        .ep-card-body { padding: 28px 32px 32px; }
        .ep-section-title { font-size: 14px; font-weight: 600; color: #82296e; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 20px; padding-bottom: 14px; border-bottom: 1px solid #f5eff4; }
        .ep-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 28px; }
        @media (max-width: 620px) { .ep-grid { grid-template-columns: 1fr; } .ep-card-body { padding: 20px; } }
        .ep-field { display: flex; flex-direction: column; }
        .ep-label { font-size: 12.5px; font-weight: 500; color: #888; margin-bottom: 7px; display: flex; align-items: center; gap: 5px; }
        .ep-input { width: 100%; border: 0; background: #faf8fb; box-shadow: 0 2px 8px rgba(0,0,0,.07); border-radius: 10px; padding: 11px 16px; font-size: 14px; color: #333; outline: none; transition: box-shadow .18s; height: 46px; }
        .ep-input:focus { box-shadow: 0 0 0 2px rgba(130,41,110,.22), 0 2px 8px rgba(0,0,0,.07); }
        .ep-input:disabled { background: #f0edf2; color: #888; cursor: not-allowed; }
        .ep-error { font-size: 12px; color: #d9534f; margin-top: 5px; }
        .ep-avatar-wrap { position: relative; width: 120px; height: 120px; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 20px rgba(130,41,110,.18); overflow: hidden; border: 3px solid #fff; outline: 3px solid #82296e; }
        .ep-avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ep-avatar-overlay { position: absolute; inset: 0; background: rgba(130,41,110,.62); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; opacity: 0; transition: opacity .2s; }
        .ep-avatar-wrap:hover .ep-avatar-overlay { opacity: 1; }
        .ep-avatar-uploading { position: absolute; inset: 0; background: rgba(130,41,110,.75); display: flex; align-items: center; justify-content: center; border-radius: 16px; }
        .ep-spinner { width: 28px; height: 28px; border: 3px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: ep-spin .7s linear infinite; }
        @keyframes ep-spin { to { transform: rotate(360deg); } }
        .ep-photo-hero { background: linear-gradient(135deg, #6a1850 0%, #82296e 60%, #a83990 100%); padding: 32px 32px 20px; display: flex; align-items: flex-end; gap: 20px; }
        .ep-photo-meta { padding-bottom: 4px; }
        .ep-photo-name { color: #fff; font-size: 18px; font-weight: 600; margin: 0 0 4px; }
        .ep-photo-hint { color: rgba(255,255,255,.7); font-size: 13px; margin: 0; }
        .ep-save-btn { background: #FBB017; border: none; color: #fff; font-weight: 600; padding: 13px 36px; border-radius: 10px; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: background .18s, transform .1s, box-shadow .18s; box-shadow: 0 4px 14px rgba(251,176,23,.35); }
        .ep-save-btn:hover { background: #e8a40f; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(251,176,23,.45); }
        .ep-save-btn:active { transform: translateY(0); }
        .ep-save-row { display: flex; justify-content: flex-end; padding-top: 4px; }
        .ep-locked-icon { color: #bbb; }
      `}</style>

      <Seo title="Edit Profile" noindex />
      <Header title={"Edit Profile"} />

      <div className="ep-page">
        <div className="ep-wrap">
          {initialValues && (
            <Formik
              initialValues={initialValues}
              validationSchema={ProfileSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (JSON.stringify(values) === JSON.stringify(initialValues)) {
                  setSubmitting(false);
                  return;
                }
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>

                  {/* ── Profile Photo Card ── */}
                  <div className="ep-card">
                    <div className="ep-photo-hero">
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={1}
                        dataURLKey="data_url"
                      >
                        {({ imageList, onImageUpload, onImageUpdate, dragProps }) => {
                          const src =
                            imageList[0]?.["data_url"] ||
                            user?.imageUrl ||
                            "/icons/tutor/user.svg";
                          const handleClick = () =>
                            imageList.length ? onImageUpdate(0) : onImageUpload();
                          return (
                            <div
                              className="ep-avatar-wrap"
                              onClick={handleClick}
                              {...dragProps}
                            >
                              <img src={src} alt="Profile" className="ep-avatar-img" />
                              {updateProfilePicture.isLoading ? (
                                <div className="ep-avatar-uploading">
                                  <div className="ep-spinner" />
                                </div>
                              ) : (
                                <div className="ep-avatar-overlay">
                                  <CameraAltOutlinedIcon
                                    sx={{ color: "white", fontSize: 28 }}
                                  />
                                  <span style={{ color: "white", fontSize: 12, fontWeight: 500 }}>
                                    Change
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        }}
                      </ImageUploading>

                      <div className="ep-photo-meta">
                        <p className="ep-photo-name">
                          {initialValues.fullname || "Your Name"}
                        </p>
                        <p className="ep-photo-hint">
                          {updateProfilePicture.isLoading
                            ? "Uploading photo…"
                            : "Click photo to update"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Personal Information Card ── */}
                  <div className="ep-card">
                    <div className="ep-card-body">
                      <p className="ep-section-title">Personal Information</p>
                      <div className="ep-grid">

                        {/* Name */}
                        <div className="ep-field">
                          <label className="ep-label" htmlFor="fullname">Name</label>
                          <Field
                            type="text"
                            name="fullname"
                            id="fullname"
                            className="ep-input"
                          />
                          <ErrorMessage name="fullname" component="div" className="ep-error" />
                        </div>

                        {/* Country */}
                        <div className="ep-field">
                          <label className="ep-label">Country</label>
                          <Field name="country">
                            {({ field, form: { setFieldValue } }: any) => (
                              <Select
                                styles={selectStyles}
                                options={initialFormData?.data?.countries
                                  .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                                  .map((c: any) => ({ label: c.name, value: c.id }))}
                                onChange={(val: any) => setFieldValue(field.name, val)}
                                defaultValue={initialValues.country}
                              />
                            )}
                          </Field>
                          <ErrorMessage name="country" component="div" className="ep-error" />
                        </div>

                        {/* Email (locked) */}
                        <div className="ep-field">
                          <label className="ep-label" htmlFor="email">
                            Email
                            <LockOutlinedIcon sx={{ fontSize: 13 }} className="ep-locked-icon" />
                          </label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className="ep-input"
                            disabled
                          />
                        </div>

                        {/* Timezone */}
                        <div className="ep-field">
                          <label className="ep-label">Time Zone</label>
                          <Field name="timezone">
                            {({ field, form: { setFieldValue } }: any) => (
                              <Select
                                styles={selectStyles}
                                options={initialFormData?.data?.timezones.map((tz: any) => ({
                                  label: tz,
                                  value: tz,
                                }))}
                                onChange={(val: any) => setFieldValue(field.name, val)}
                                defaultValue={initialValues.timezone}
                              />
                            )}
                          </Field>
                          <ErrorMessage name="timezone" component="div" className="ep-error" />
                        </div>

                        {/* Phone (locked) */}
                        <div className="ep-field">
                          <label className="ep-label" htmlFor="phone">
                            Phone Number
                            <LockOutlinedIcon sx={{ fontSize: 13 }} className="ep-locked-icon" />
                          </label>
                          <Field name="phone">
                            {({ field, form: { setFieldValue } }: any) => (
                              <PhoneInput
                                country={"us"}
                                value={field.value}
                                onChange={(val) => setFieldValue(field.name, val)}
                                onBlur={field.onBlur}
                                inputStyle={phoneInputStyle}
                                buttonStyle={phoneButtonStyle}
                                inputProps={{ name: field.name }}
                                specialLabel=""
                                disabled
                              />
                            )}
                          </Field>
                        </div>

                        {/* Address */}
                        <div className="ep-field">
                          <label className="ep-label" htmlFor="address">Address</label>
                          <Field
                            type="text"
                            name="address"
                            id="address"
                            className="ep-input"
                          />
                          <ErrorMessage name="address" component="div" className="ep-error" />
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* ── Security Card ── */}
                  <div className="ep-card">
                    <div className="ep-card-body">
                      <p className="ep-section-title">Security</p>
                      <div className="ep-grid">

                        <div className="ep-field">
                          <label className="ep-label" htmlFor="password">New Password</label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className="ep-input"
                            placeholder="Leave blank to keep current"
                          />
                        </div>

                        <div className="ep-field">
                          <label className="ep-label" htmlFor="confirm_password">Confirm Password</label>
                          <Field
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            className="ep-input"
                            placeholder="Repeat new password"
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* ── Save ── */}
                  <div className="ep-save-row">
                    <button type="submit" className="ep-save-btn">
                      Save Changes
                      <DoneIcon sx={{ fontSize: 18 }} />
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </>
  );
}

export default withAuthNew(EditProfilePageStudent, "student");
