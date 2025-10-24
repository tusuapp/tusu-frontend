import React, { useEffect, useState } from "react";
import Router from "next/router";
import Button from "components/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import withAuthNew from "HOC/withAuthNew";
import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Select from "react-select";
import { customStyles } from "../styles";
import { AnimatePresence, motion } from "framer-motion";
import { convertApiToStateFormat } from "utils";
// TODO convert initial data fetching to react query

const ROLE = "tutor";

const ExtraProfileSchema = Yup.object().shape({
  description: Yup.string()
    .typeError("Invalid format")
    .max(160, "More than 160 characters not allowed")
    .required("Description is required"),

  experienceYears: Yup.number()
    .typeError("Invalid format")
    // .max(160, "More than 160 characters not allowed")
    .required("Experience is required"),

  hourlyCharges: Yup.number()
    .typeError("Invalid format")
    // .max(160, "More than 160 characters not allowed")
    .required("Hourly charges is required"),

  disciplines: Yup.array()
    .of(Yup.number())
    .typeError("Invalid type")
    .required("Disciplines is required"),
});

interface Props {
  onSubmit: any;
  initialFormData: any;
  isFetching: boolean;
}

const StepOne: React.FC<Props> = ({
  onSubmit,
  initialFormData,
  isFetching,
}) => {
  const [disciplineOptions, setDisciplineOptions] = useState([]);

  // Initial form value

  const initialValues = {
    description: "",
    hourlyCharges: null,
    experienceYears: null,
    disciplines: [],
  };

  // Fetches the initial form data from the API only if user object is there

  useEffect(() => {
    getInitialFormData();
  }, [initialFormData]);

  const getInitialFormData = () => {
    if (!initialFormData) return;

    const disciplines = initialFormData.discipline;

    setDisciplineOptions(convertApiToStateFormat(disciplines, "discipline"));
  };

  const handleFormSubmit = (values: any) => {
    const data = {
      description: values.description,
      disciplines: values.disciplines,
      experience: Number(values.experienceYears),
      hourly_charge: Number(values.hourlyCharges),
    };

    onSubmit(data);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="ConfirmDialogueBox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="Complete__profile__page h-100 d-flex flex-column"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={ExtraProfileSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched, isValid, dirty }) => {
              return (
                <>
                  <Form className="d-flex flex-column h-100">
                    <div className="row">
                      <div className="col-md-12">
                        <Field name="description">
                          {({
                            field,
                            form: { touched, setFieldValue, setTouched },
                          }: any) => (
                            <>
                              <div className="d-flex p-0 mb-1 justify-content-between">
                                <h2 className="Form__input__label">
                                  Tell us about you
                                </h2>
                                {/* <div>{field.value.length}/160</div> */}
                              </div>
                              <textarea
                                className="Form__input__textarea m-0"
                                placeholder="Write here..."
                                onChange={(e) => {
                                  setFieldValue([field.name], e.target.value);
                                  setTouched({
                                    ...touched,
                                    [field.name]: true,
                                  });
                                }}
                              />
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h2 className="Form__input__label mt-3"> Experience</h2>
                        <Field
                          type="name"
                          name="experienceYears"
                          placeholder="Experience"
                          id="experienceYears"
                          className={`Form__input__text ${
                            errors.experienceYears && touched.experienceYears
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
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h2 className="Form__input__label mt-3">
                          Hourly charge
                        </h2>
                        <Field
                          type="name"
                          name="hourlyCharges"
                          id="hourlyCharges"
                          placeholder="$"
                          className={`Form__input__text ${
                            errors.experienceYears && touched.experienceYears
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
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h2 className="Form__input__label mt-3">
                          Disciplines you are teaching
                        </h2>
                        <Field name="disciplines">
                          {({
                            field,
                            form: { touched, setFieldValue, setTouched },
                          }: any) => (
                            <div className="mb-3">
                              <Select
                                instanceId="disciplines-select"
                                options={disciplineOptions}
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
                    <div className="mt-auto"></div>
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
                  </Form>
                </>
              );
            }}
          </Formik>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default StepOne;
