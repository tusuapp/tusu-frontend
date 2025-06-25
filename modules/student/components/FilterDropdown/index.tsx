import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import useInitialFormData from "@/tutor/hooks/useInitialFormData";
import { customStyles } from "@/tutor/components/CompleteProfile/styles";
import { genderOptions } from "consts/genders";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useQuery } from "react-query";
import { api } from "../../../../api";
import { useRouter } from "next/router";

interface IFilterDropdown {
  onApplyFilter(xx: any): any;
  parentHandleClear(): any;
}

const FilterDropdown: React.FC<IFilterDropdown> = ({
  onApplyFilter,
  parentHandleClear,
}) => {
  const router = useRouter();

  const initValues = {
    country: null,
    gender: null,
    experienceYears: null,
    disciplines: null,
    subjects: null,
    knownLanguages: null,
    hourlyCharges: [0, 200],
  };
  const [initialValues, setInitialValues] = useState<any>(initValues);
  const initialFormData = useInitialFormData();
  const allCountries = useQuery("allCountries", () =>
    api.get("/countries").then((res) => res.data)
  );
  const levelOptions = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "5", label: "5" },
    { value: "8", label: "8" },
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
  ];

  function buildSearchQry(searchVals: Array<any>) {
    let _where: Array<string> = [];

    // _where[0][country.name]=india&_where[1][tutor_details.gender]=male
    try {
      let i = 0;
      Object.keys(searchVals).forEach((key: any, index: any) => {
        let val: any = searchVals[key];

        if (key == "country" && val && val.value) {
          let xx = `country.id=${val.value}`;
          _where.push(xx);
        }
        if (key == "gender" && val && val.value) {
          let xx = `tutor_details.gender=${val.value}`;
          _where.push(xx);
        }
        if (key == "experienceYears" && val && val.value) {
          let xx = `tutor_details.experience=${val.value}`;
          _where.push(xx);
        }
        if (key == "disciplines" && val) {
          _where.push(
            buildOrWhereQry("tutor_details.discipline_id.id_in", val, i++)
          );
        }
        if (key == "subjects" && val) {
          _where.push(
            buildOrWhereQry("tutor_details.subject_id.id_in", val, i++)
          );
        }
        if (key == "knownLanguages" && val) {
          _where.push(
            buildOrWhereQry("tutor_details.language.id_in", val, i++)
          );
        }
        if (key == "hourlyCharges" && val && val[1] > 0) {
          let xx = `tutor_details.hourly_charge_lte=${val[1]}&tutor_details.hourly_charge_gte=${val[0]}`;
          _where.push(xx);
        }
      });
    } catch (e) {
      console.log("_where err", e);
    }

    const searchQru = _where.join("&");
    onApplyFilter("&" + searchQru);
  }

  function buildOrWhereQry(
    key: string,
    val: Array<{ value: any }>,
    index: number
  ) {
    // _where[0][tutor_details.language.id_in]=6

    let orWhere: any = [];
    if (val && val.length) {
      val.forEach((d: { value: any }) => {
        let xx = `${index}.${key}=${d.value}`;
        orWhere.push(xx);
      });
    }
    return orWhere.join("&");
  }

  function handleClear() {
    if (router.pathname === "/student/search") {
      router.reload();
      router.replace("/student/search", undefined, { shallow: true });
      parentHandleClear();
    }
  }

  return (
    <>
      <AnimatePresence>
        <motion.div>
          <Menu>
            {/* <Menu.Button className="btn text-brand">Filters</Menu.Button> */}

            <Menu.Items className="student__filters__wrapper">
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  buildSearchQry(values);
                  setInitialValues(values);
                }}
              >
                {({ errors, touched, values, isValid, dirty, resetForm }) => {
                  return (
                    <Form className="filter_wrapper">
                      <div className="row">
                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value">Languages</div>
                          <div className="profile__field__value">
                            {/* ${data?.tutor_details?.hourly_charge} */}
                            <Field name="knownLanguages">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
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
                                    defaultValue={initialValues.knownLanguages}
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
                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value">Country</div>
                          <div className="profile__field__value">
                            <Field name="country">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
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
                                        value: country.id,
                                      }))}
                                    isLoading={initialFormData.isFetching}
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
                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value">Experience</div>
                          <div className="profile__field__value">
                            <Field name="experienceYears">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
                              }: any) => (
                                <div className="mb-3">
                                  <Select
                                    instanceId="level-select"
                                    options={levelOptions}
                                    isLoading={initialFormData.isFetching}
                                    onChange={(value: any) => {
                                      setFieldValue(field.name, value);
                                    }}
                                    styles={customStyles}
                                    defaultValue={initialValues.experienceYears}
                                    isMulti={false}
                                    menuPlacement="top"
                                  />
                                </div>
                              )}
                            </Field>
                            <ErrorMessage
                              name="level"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value">
                            Disciplines
                          </div>
                          <div className="profile__field__value">
                            <Field name="disciplines">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
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
                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value">Subjects</div>
                          <div className="profile__field__value">
                            <Field name="subjects">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
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
                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value"> Gender</div>
                          <div className="profile__field__value">
                            <Field name="gender">
                              {({
                                field,
                                form: { touched, setFieldValue, setTouched },
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
                        <div className="col-12 col-sm-4 d-flex">
                          <div className="filter__field__value">
                            <span
                              style={{
                                width: "179px",
                                height: "23px",
                                color: "#924781",
                                fontSize: "20px",
                              }}
                              onClick={() => {
                                handleClear();
                              }}
                            >
                              Clear Filter
                            </span>
                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="filter__field__value">Price</div>

                          <Field name="hourlyCharges">
                            {({
                              field,
                              form: { touched, setFieldValue, setTouched },
                            }: any) => {
                              return (
                                <Box sx={{ width: 300 }}>
                                  <Slider
                                    getAriaLabel={() => "Hourly charge"}
                                    value={field.value}
                                    max={200}
                                    onChange={(value) => {
                                      // @ts-ignore
                                      setFieldValue(
                                        field.name,
                                        value.target.value
                                      );
                                    }}
                                    valueLabelDisplay="auto"
                                  />
                                </Box>
                              );
                            }}
                          </Field>
                        </div>
                        <div className="col-12 col-sm-4"></div>
                        <div className="col-12 col-sm-4">
                          <div>
                            <button
                              type="submit"
                              className="btn btn-default"
                              style={{
                                backgroundColor: "#E0E0E0",
                                borderColor: "#E0E0E0",
                                width: "320px",
                                height: "53px",
                              }}
                            >
                              {/* onClick={() => router.back() */}
                              <span
                                style={{
                                  color: "#4F4B4B",
                                  width: "191px",
                                  height: "24px",
                                  fontSize: "22px",
                                }}
                              >
                                Apply Filter
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Menu.Items>
          </Menu>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default FilterDropdown;
