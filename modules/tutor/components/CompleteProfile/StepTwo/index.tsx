import React, { useEffect, useState } from "react";
import Button from "components/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { customStyles } from "../styles";
import { convertApiToStateFormat } from "utils";
import { motion } from "framer-motion";

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "others", label: "Others" },
];

const ExtraProfileSchema = Yup.object().shape({
  gender: Yup.string()
    .typeError("Invalid format")
    .max(160, "More than 160 characters not allowed")
    .required("gender is required"),

  subjects: Yup.array().of(Yup.number()).required("Subjects is required"),

  timezone: Yup.string()
    .typeError("Ivalid format")
    .required("Timezone is required"),
});

interface Props {
  onSubmit: any;
  fetchedApiData: any;
  isFetching: boolean;
}

const StepTwo: React.FC<Props> = ({ fetchedApiData, isFetching, onSubmit }) => {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [timezoneOptions, setTimezoneOptions] = useState([]);
  const [langauageOptions, setLanguageOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  // Initial form value

  const initialValues = {
    subjects: [],
    timezone: "",
    languages: [],
    gender: "",
    countryId: null,
  };

  // Fetches the initial form data from the API only if user object is there

  useEffect(() => {
    if (!fetchedApiData) return;

    getfetchedApiData();
  }, [fetchedApiData]);

  const getfetchedApiData = () => {
    if (!fetchedApiData) return;

    setSubjectOptions(
      convertApiToStateFormat(fetchedApiData.subject, "subject")
    );

    setLanguageOptions(
      convertApiToStateFormat(fetchedApiData.languages, "languages")
    );

    setTimezoneOptions(
      convertApiToStateFormat(fetchedApiData.timezones, "timezone")
    );

    setCountryOptions(
      convertApiToStateFormat(fetchedApiData.countries, "countries")
    );
  };

  const handleFormSubmit = async (values: any) => {
    // const data = {
    //   subjects: values.subjects,
    //   languages: values.languages,
    //   gender: values.gender,
    //   timezone: values.timezone,
    // };
    // alert("Onsubmit");
    onSubmit(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ExtraProfileSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, isValid, dirty }) => {
          return (
            <>
              <motion.div
                key="ConfirmDialogueBox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="Complete__profile__page h-100 d-flex flex-column"
              >
                <Form className="d-flex flex-column h-100">
                  <div className="row">
                    <div className="col-md-12">
                      <h2
                        style={{
                          fontSize: "16px",
                          color: "#000",
                        }}
                        className="mb-1 text-dark"
                      >
                        Subject / Modules
                      </h2>

                      <Field name="subjects">
                        {({
                          field,
                          form: { touched, setFieldValue, setTouched },
                        }: any) => (
                          <div>
                            <Select
                              instanceId="subjects-select"
                              options={subjectOptions}
                              styles={customStyles}
                              isLoading={isFetching}
                              onChange={(options: any) => {
                                const optionIds = options.map(
                                  (option: any) => option.value
                                );

                                setFieldValue(field.name, optionIds);
                              }}
                              isMulti={true}
                              onBlur={() =>
                                setTouched({
                                  ...touched,
                                  [field.name]: true,
                                })
                              }
                              menuPlacement="bottom"
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h2
                        style={{
                          fontSize: "16px",
                          color: "#000",
                        }}
                        className="mb-1 mt-3 text-dark"
                      >
                        Gender
                      </h2>
                      <Field name="gender">
                        {({
                          field,
                          form: { touched, setFieldValue, setTouched },
                        }: any) => (
                          <div>
                            <Select
                              instanceId="gender-select"
                              options={genderOptions}
                              styles={customStyles}
                              onChange={(option) =>
                                setFieldValue(field.name, (option as any).value)
                              }
                              onBlur={() =>
                                setTouched({
                                  ...touched,
                                  [field.name]: true,
                                })
                              }
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
                  <div className="row">
                    <div className="col-md-12">
                      <h2
                        style={{
                          fontSize: "16px",
                          color: "#000",
                        }}
                        className="mb-1 mt-3 text-dark"
                      >
                        Known Languages
                      </h2>
                      <Field name="languages">
                        {({
                          field,
                          form: { touched, setFieldValue, setTouched },
                        }: any) => (
                          <div>
                            <Select
                              instanceId="languages-select"
                              options={langauageOptions}
                              isLoading={isFetching}
                              styles={customStyles}
                              onChange={(options: any) => {
                                const optionIds = options.map(
                                  (option: any) => option.value
                                );

                                setFieldValue(field.name, optionIds);
                              }}
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
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h2
                        style={{
                          fontSize: "16px",
                          color: "#000",
                        }}
                        className="mb-1 mt-3 text-dark"
                      >
                        Timezone
                      </h2>

                      <Field name="timezone">
                        {({
                          field,
                          form: { touched, setFieldValue, setTouched },
                        }: any) => (
                          <div className="mb-3">
                            <Select
                              instanceId="timezone-select"
                              options={timezoneOptions}
                              styles={customStyles}
                              isLoading={isFetching}
                              onChange={(option) =>
                                setFieldValue(field.name, (option as any).value)
                              }
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
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h2
                        style={{
                          fontSize: "16px",
                          color: "#000",
                        }}
                        className="mb-1 mt-3 text-dark"
                      >
                        Country
                      </h2>
                      <Field name="countryId">
                        {({
                          field,
                          form: { touched, setFieldValue, setTouched },
                        }: any) => (
                          <div>
                            <Select
                              instanceId="countryId-select"
                              options={countryOptions}
                              styles={customStyles}
                              onChange={(option) =>
                                setFieldValue(field.name, (option as any).value)
                              }
                              onBlur={() =>
                                setTouched({
                                  ...touched,
                                  [field.name]: true,
                                })
                              }
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="countryId"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-end">
                      <Button
                        type="primary"
                        className="btn-brand btn-lg mt-auto "
                        style={{ width: "123px" }}
                        // onClick={handleFormSubmit}
                        disabled={!(dirty && isValid)}
                        // loading={isLoading}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Form>
              </motion.div>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default StepTwo;
