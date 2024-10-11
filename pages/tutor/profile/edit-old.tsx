import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchDesciplines,
  fetchSubjects,
  selectProfile,
} from "../../../features/profile/profileSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MultiSelect from "react-multi-select-component";
import { selectAuth, updateProfile } from "../../../features/auth/authSlice";
import { api } from "../../../api";
import Header from "modules/tutor/components/Header";
import TutorDashboardLayout from "layouts/TutorDashboard";

const convertApiToStateFormat = (data: any, type: any) => {
  const convertedData: any = [];
  if (type === "descipline") {
    data.forEach((item: any) => {
      console.log({ label: item.name, value: item.id });
      convertedData.push({ label: item.name, value: item.id });
    });
  }

  if (type === "subject") {
    data.forEach((item: any) => {
      console.log({ label: item.name, value: item.id });
      convertedData.push({ label: item.name, value: item.id });
    });
  }
  return convertedData;
};

const timezones = [
  "Africa/Abidjan",
  "Africa/Accra",
  "Africa/Algiers",
  "Africa/Bissau",
  "Africa/Cairo",
  "Africa/Casablanca",
  "Africa/Ceuta",
  "Africa/El_Aaiun",
  "Africa/Johannesburg",
  "Africa/Juba",
  "Africa/Khartoum",
  "Africa/Lagos",
  "Africa/Maputo",
  "Africa/Monrovia",
  "Africa/Nairobi",
  "Africa/Ndjamena",
  "Africa/Sao_Tome",
  "Africa/Tripoli",
  "Africa/Tunis",
  "Africa/Windhoek",
  "America/Adak",
  "America/Anchorage",
  "America/Araguaina",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Catamarca",
  "America/Argentina/Cordoba",
  "America/Argentina/Jujuy",
  "America/Argentina/La_Rioja",
  "America/Argentina/Mendoza",
  "America/Argentina/Rio_Gallegos",
  "America/Argentina/Salta",
  "America/Argentina/San_Juan",
  "America/Argentina/San_Luis",
  "America/Argentina/Tucuman",
  "America/Argentina/Ushuaia",
  "America/Asuncion",
  "America/Atikokan",
  "America/Bahia",
  "America/Bahia_Banderas",
  "America/Barbados",
  "America/Belem",
  "America/Belize",
  "America/Blanc-Sablon",
  "America/Boa_Vista",
  "America/Bogota",
  "America/Boise",
  "America/Cambridge_Bay",
  "America/Campo_Grande",
  "America/Cancun",
  "America/Caracas",
  "America/Cayenne",
  "America/Chicago",
  "America/Chihuahua",
  "America/Costa_Rica",
  "America/Creston",
  "America/Cuiaba",
  "America/Curacao",
  "America/Danmarkshavn",
  "America/Dawson",
  "America/Dawson_Creek",
  "America/Denver",
  "America/Detroit",
  "America/Edmonton",
  "America/Eirunepe",
  "America/El_Salvador",
  "America/Fort_Nelson",
  "America/Fortaleza",
  "America/Glace_Bay",
  "America/Goose_Bay",
  "America/Grand_Turk",
  "America/Guatemala",
  "America/Guayaquil",
  "America/Guyana",
  "America/Halifax",
  "America/Havana",
  "America/Hermosillo",
  "America/Indiana/Indianapolis",
  "America/Indiana/Knox",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Tell_City",
  "America/Indiana/Vevay",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Inuvik",
  "America/Iqaluit",
  "America/Jamaica",
  "America/Juneau",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/La_Paz",
  "America/Lima",
  "America/Los_Angeles",
  "America/Maceio",
  "America/Managua",
  "America/Manaus",
  "America/Martinique",
  "America/Matamoros",
  "America/Mazatlan",
  "America/Menominee",
  "America/Merida",
  "America/Metlakatla",
  "America/Mexico_City",
  "America/Miquelon",
  "America/Moncton",
  "America/Monterrey",
  "America/Montevideo",
  "America/Nassau",
  "America/New_York",
  "America/Nipigon",
  "America/Nome",
  "America/Noronha",
  "America/North_Dakota/Beulah",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/Nuuk",
  "America/Ojinaga",
  "America/Panama",
  "America/Pangnirtung",
  "America/Paramaribo",
  "America/Phoenix",
  "America/Port-au-Prince",
  "America/Port_of_Spain",
  "America/Porto_Velho",
  "America/Puerto_Rico",
  "America/Punta_Arenas",
  "America/Rainy_River",
  "America/Rankin_Inlet",
  "America/Recife",
  "America/Regina",
  "America/Resolute",
  "America/Rio_Branco",
  "America/Santarem",
  "America/Santiago",
  "America/Santo_Domingo",
  "America/Sao_Paulo",
  "America/Scoresbysund",
  "America/Sitka",
  "America/St_Johns",
  "America/Swift_Current",
  "America/Tegucigalpa",
  "America/Thule",
  "America/Thunder_Bay",
  "America/Tijuana",
  "America/Toronto",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Winnipeg",
  "America/Yakutat",
  "America/Yellowknife",
  "Antarctica/Casey",
  "Antarctica/Davis",
  "Antarctica/DumontDUrville",
  "Antarctica/Macquarie",
  "Antarctica/Mawson",
  "Antarctica/Palmer",
  "Antarctica/Rothera",
  "Antarctica/Syowa",
  "Antarctica/Troll",
  "Antarctica/Vostok",
  "Asia/Almaty",
  "Asia/Amman",
  "Asia/Anadyr",
  "Asia/Aqtau",
  "Asia/Aqtobe",
  "Asia/Ashgabat",
  "Asia/Atyrau",
  "Asia/Baghdad",
  "Asia/Baku",
  "Asia/Bangkok",
  "Asia/Barnaul",
  "Asia/Beirut",
  "Asia/Bishkek",
  "Asia/Brunei",
  "Asia/Chita",
  "Asia/Choibalsan",
  "Asia/Colombo",
  "Asia/Damascus",
  "Asia/Dhaka",
  "Asia/Dili",
  "Asia/Dubai",
  "Asia/Dushanbe",
  "Asia/Famagusta",
  "Asia/Gaza",
  "Asia/Hebron",
  "Asia/Ho_Chi_Minh",
  "Asia/Hong_Kong",
  "Asia/Hovd",
  "Asia/Irkutsk",
  "Asia/Jakarta",
  "Asia/Jayapura",
  "Asia/Jerusalem",
  "Asia/Kabul",
  "Asia/Kamchatka",
  "Asia/Karachi",
  "Asia/Kathmandu",
  "Asia/Khandyga",
  "Asia/Kolkata",
  "Asia/Krasnoyarsk",
  "Asia/Kuala_Lumpur",
  "Asia/Kuching",
  "Asia/Macau",
  "Asia/Magadan",
  "Asia/Makassar",
  "Asia/Manila",
  "Asia/Nicosia",
  "Asia/Novokuznetsk",
  "Asia/Novosibirsk",
  "Asia/Omsk",
  "Asia/Oral",
  "Asia/Pontianak",
  "Asia/Pyongyang",
  "Asia/Qatar",
  "Asia/Qostanay",
  "Asia/Qyzylorda",
  "Asia/Riyadh",
  "Asia/Sakhalin",
  "Asia/Samarkand",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Srednekolymsk",
  "Asia/Taipei",
  "Asia/Tashkent",
  "Asia/Tbilisi",
  "Asia/Tehran",
  "Asia/Thimphu",
  "Asia/Tokyo",
  "Asia/Tomsk",
  "Asia/Ulaanbaatar",
  "Asia/Urumqi",
  "Asia/Ust-Nera",
  "Asia/Vladivostok",
  "Asia/Yakutsk",
  "Asia/Yangon",
  "Asia/Yekaterinburg",
  "Asia/Yerevan",
  "Atlantic/Azores",
  "Atlantic/Bermuda",
  "Atlantic/Canary",
  "Atlantic/Cape_Verde",
  "Atlantic/Faroe",
  "Atlantic/Madeira",
  "Atlantic/Reykjavik",
  "Atlantic/South_Georgia",
  "Atlantic/Stanley",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Broken_Hill",
  "Australia/Darwin",
  "Australia/Eucla",
  "Australia/Hobart",
  "Australia/Lindeman",
  "Australia/Lord_Howe",
  "Australia/Melbourne",
  "Australia/Perth",
  "Australia/Sydney",
  "CET",
  "CST6CDT",
  "EET",
  "EST",
  "EST5EDT",
  "Etc/GMT",
  "Etc/GMT+1",
  "Etc/GMT+10",
  "Etc/GMT+11",
  "Etc/GMT+12",
  "Etc/GMT+2",
  "Etc/GMT+3",
  "Etc/GMT+4",
  "Etc/GMT+5",
  "Etc/GMT+6",
  "Etc/GMT+7",
  "Etc/GMT+8",
  "Etc/GMT+9",
  "Etc/GMT-1",
  "Etc/GMT-10",
  "Etc/GMT-11",
  "Etc/GMT-12",
  "Etc/GMT-13",
  "Etc/GMT-14",
  "Etc/GMT-2",
  "Etc/GMT-3",
  "Etc/GMT-4",
  "Etc/GMT-5",
  "Etc/GMT-6",
  "Etc/GMT-7",
  "Etc/GMT-8",
  "Etc/GMT-9",
  "Etc/UTC",
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Astrakhan",
  "Europe/Athens",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Chisinau",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/Kaliningrad",
  "Europe/Kiev",
  "Europe/Kirov",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Minsk",
  "Europe/Monaco",
  "Europe/Moscow",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Samara",
  "Europe/Saratov",
  "Europe/Simferopol",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Tirane",
  "Europe/Ulyanovsk",
  "Europe/Uzhgorod",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Volgograd",
  "Europe/Warsaw",
  "Europe/Zaporozhye",
  "Europe/Zurich",
  "HST",
  "Indian/Chagos",
  "Indian/Christmas",
  "Indian/Cocos",
  "Indian/Kerguelen",
  "Indian/Mahe",
  "Indian/Maldives",
  "Indian/Mauritius",
  "Indian/Reunion",
  "MET",
  "MST",
  "MST7MDT",
  "PST8PDT",
  "Pacific/Apia",
  "Pacific/Auckland",
  "Pacific/Bougainville",
  "Pacific/Chatham",
  "Pacific/Chuuk",
  "Pacific/Easter",
  "Pacific/Efate",
  "Pacific/Enderbury",
  "Pacific/Fakaofo",
  "Pacific/Fiji",
  "Pacific/Funafuti",
  "Pacific/Galapagos",
  "Pacific/Gambier",
  "Pacific/Guadalcanal",
  "Pacific/Guam",
  "Pacific/Honolulu",
  "Pacific/Kiritimati",
  "Pacific/Kosrae",
  "Pacific/Kwajalein",
  "Pacific/Majuro",
  "Pacific/Marquesas",
  "Pacific/Nauru",
  "Pacific/Niue",
  "Pacific/Norfolk",
  "Pacific/Noumea",
  "Pacific/Pago_Pago",
  "Pacific/Palau",
  "Pacific/Pitcairn",
  "Pacific/Pohnpei",
  "Pacific/Port_Moresby",
  "Pacific/Rarotonga",
  "Pacific/Tahiti",
  "Pacific/Tarawa",
  "Pacific/Tongatapu",
  "Pacific/Wake",
  "Pacific/Wallis",
  "WET",
];

const SignInSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),

  email: Yup.string().email().required("Email is required"),

  country: Yup.string().required("Country is required"),

  timezone: Yup.string().required("Timezone is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number"),

  // new_password: Yup.string()
  //   .required("Password is required")
  //   .min(4, "Password is too short - should be 4 chars minimum"),

  // confirm_new_password: Yup.string().oneOf(
  //   [Yup.ref("new_password"), null],
  //   "Passwords must match"
  // ),

  address: Yup.string().required("Address is required"),

  experience: Yup.number()
    .nullable()
    .typeError("Please enter a number")
    .required("Experience is required"),
});

function EditProfilePage() {
  const ROLE = "tutor";

  const dispatch = useDispatch();

  const [disciplineOptions, setDesciplineOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  // const [timezones, setTimezones] = useState([]);
  const { desciplines, subjects } = useSelector(selectProfile);

  const { user } = useSelector(selectAuth);

  const initialValues = {
    fullname: user?.fullname,
    email: user?.email,
    phone: user?.phone,
    // new_password: "",
    // confirm_new_password: "",
    address: user?.address,
    description: "Lorem ipsum",
    country: null,
    country_code: 91,
    timezone: user?.timezone,
    experience: user?.experience,
    disciplines: [],
    // disciplines: convertApiToStateFormat(user?.disciplines, "descipline"),
    // subjects: convertApiToStateFormat(user?.subjects, "subject"),
    subjects: [],
  };

  useEffect(() => {
    // fetchTimezones();
    dispatch(fetchDesciplines());
    dispatch(fetchSubjects());
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (desciplines) {
      const convertedDesciplines = convertApiToStateFormat(
        desciplines,
        "descipline"
      );
      setDesciplineOptions(convertedDesciplines);
    }

    if (subjects) {
      const convertedSubjects = convertApiToStateFormat(subjects, "subject");
      setSubjectOptions(convertedSubjects);
    }
  }, [desciplines, subjects]);

  // const fetchTimezones = () => {
  //   alert("fetching tinmesonze");
  //   try {
  //     api.get("/category?modules=timezone").then((response) => {
  //       setTimezones(response.data.result);
  //       alert(JSON.stringify(response.data.result));
  //     });
  //   } catch (e) {
  //     return console.log(e.message);
  //   }
  // };

  const handleSaveProfile = (values: any) => {
    let subjectIDs;
    let desciplineIDs;

    if (values.subjects) {
      subjectIDs = values.subjects.map((subject: any) => subject.value);
    }

    if (values.disciplines) {
      desciplineIDs = values.disciplines.map((subject: any) => subject.value);
    }

    const data = {
      ...values,
      subjects: subjectIDs,
      disciplines: desciplineIDs,
      hourly_charge: 100,
      video: "",
      image: "",
    };

    console.log(data);

    dispatch(updateProfile(data, ROLE));
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TutorDashboardLayout>
        <div className="container">
          {user && (
            <Formik
              initialValues={initialValues}
              validationSchema={SignInSchema}
              onSubmit={handleSaveProfile}
            >
              {({ errors, touched, isValid, dirty }) => {
                return (
                  <div className="container">
                    <Form>
                      <div className="d-flex justify-content-end mb-5">
                        <button
                          type="submit"
                          className={
                            !(dirty && isValid)
                              ? "btn btn-brand disabled"
                              : "btn btn-brand"
                          }
                          style={{
                            backgroundColor: "#FBB017",
                            borderColor: "#FBB017",
                          }}
                          disabled={!(dirty && isValid)}
                        >
                          Save
                        </button>
                      </div>
                      <div className="form-row d-flex mb-5">
                        <div className="p-1 form-field-3">
                          <label htmlFor="fullname">Name</label>
                          <Field
                            type="name"
                            name="fullname"
                            id="fullname"
                            className={
                              errors.fullname && touched.fullname
                                ? "input-error"
                                : null
                            }
                          />
                          <ErrorMessage
                            name="fullname"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="p-1 form-field-3">
                          <label htmlFor="email">Email</label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className={
                              errors.email && touched.email
                                ? "input-error"
                                : null
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="p-1 form-field-3">
                          <label htmlFor="phone">Phone</label>
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            className={
                              errors.phone && touched.phone
                                ? "input-error"
                                : null
                            }
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>

                      {/* <div className="form-row d-flex mb-5">
                    <div className="p-1 form-field-3">
                      <label htmlFor="new_password">Password</label>
                      <Field
                        type="password"
                        name="new_password"
                        id="new_password"
                        // className={
                        //   errors.new_password && touched.new_password
                        //     ? "input-error"
                        //     : null
                        // }
                      />
                      <ErrorMessage
                        name="new_password"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="p-1 form-field-3">
                      <label htmlFor="confirm_new_password">
                        Repeat Password
                      </label>
                      <Field
                        type="password"
                        name="confirm_new_password"
                        id="confirm_new_password"
                        // className={
                        //   errors.confirm_new_password &&
                        //   touched.confirm_new_password
                        //     ? "input-error"
                        //     : null
                        // }
                      />
                      <ErrorMessage
                        name="confirm_new_password"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div> */}
                      <div className="form-row d-flex mb-5">
                        <div className="p-1 form-field-3">
                          <label htmlFor="address">Address</label>
                          <Field
                            type="name"
                            name="address"
                            id="address"
                            className={
                              errors.address && touched.address
                                ? "input-error"
                                : null
                            }
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="p-1  form-field-3">
                          <label htmlFor="email">Country</label>
                          <Field name="country">
                            {({
                              field,
                              form: { touched, setFieldValue, setTouched },
                              meta,
                            }: any) => (
                              <>
                                <select {...field} className="w-75">
                                  <option value="">
                                    {!field.value
                                      ? "Choose a country"
                                      : field.value}
                                  </option>
                                  <option value="red">India</option>
                                  <option value="green">USA</option>
                                  <option value="blue">UK</option>
                                </select>
                              </>
                            )}
                          </Field>
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div className="p-1 form-field-3">
                          <label htmlFor="timezone">Timezone</label>
                          <Field as="select" name="timezone">
                            <option value="">Choose a timezone</option>
                            {timezones.map((timezone, index) => (
                              <option value={timezone} key={index}>
                                {timezone}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="timezone"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      <div className="form-row d-flex">
                        <div className="p-1 form-field-3">
                          <label htmlFor="experience">
                            Experience (year(s))
                          </label>
                          <Field
                            type="name"
                            name="experience"
                            id="experience"
                            className={
                              errors.experience && touched.experience
                                ? "input-error"
                                : null
                            }
                          />
                          <ErrorMessage
                            name="experience"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="p-1 form-field-3">
                          <label htmlFor="email">Disciplines</label>
                          <Field name="disciplines">
                            {({
                              field,
                              form: { touched, setFieldValue, setTouched },
                              meta,
                            }: any) => (
                              <div>
                                <MultiSelect
                                  options={disciplineOptions}
                                  value={field.value}
                                  onChange={(e: any) => {
                                    setFieldValue([field.name], e);
                                    setTouched({
                                      ...touched,
                                      [field.name]: true,
                                    });
                                  }}
                                  labelledBy="Select disciplines"
                                  // className="form-control"
                                />
                                {meta.touched && meta.error && (
                                  <div className="error">{meta.error}</div>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="p-1 form-field-3">
                          <label htmlFor="subjects">Subjects</label>
                          <Field name="subjects">
                            {({
                              field,
                              form: { touched, setFieldValue, setTouched },
                              meta,
                            }: any) => (
                              <div>
                                <MultiSelect
                                  options={subjectOptions}
                                  value={field.value}
                                  onChange={(e: any) => {
                                    setFieldValue([field.name], e);
                                    setTouched({
                                      ...touched,
                                      [field.name]: true,
                                    });
                                  }}
                                  labelledBy="Select disciplines"
                                  // className="form-control"
                                />
                                {meta.touched && meta.error && (
                                  <div className="error">{meta.error}</div>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                      <br />
                      <br />
                    </Form>
                  </div>
                );
              }}
            </Formik>
          )}
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default EditProfilePage;
