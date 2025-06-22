import Container from "../../../components/container";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTutorProfile,
  selectStudentTutorProfile,
} from "../../../features/students/TutorProfileSlice";
import { formatDDMMYYYY, formatYYYYMMDD } from "../../../utils";
import Error from "../../_error";
import { v2api, api, setApplicationName } from "../../../api";
import TimeSlots from "../../../modules/student/components/TimeSlots";
import ProfileExtras from "../../../modules/tutor/components/ProfileExtras";
import Button from "../../../components/button";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import StudentDashboardLayout from "layouts/StudentDashboard";
import useTutorReviews from "@/student/hooks/useTutorReviews";
import { Rating, RatingView } from "react-simple-star-rating";
import ReactPlayer from "react-player";
import CircleIcon from "@mui/icons-material/Circle";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import withAuthNew from "../../../HOC/withAuthNew";

const MAX_DATE = new Date(); // Now

MAX_DATE.setDate(MAX_DATE.getDate() + 30);

const addToCart = async (data: any) => {
  let cartId = null;

  await v2api
    .post(`/user/classes/bookings/initiate`, data)
    .then((response) => {
      cartId = response.data.id;
    })
    .catch(() => {
      return false;
    });

  return cartId;
};

function TutorProfile() {
  const router = useRouter();
  const { tutor_slug } = router.query;

  const profile = useSelector(selectStudentTutorProfile);
  const [hasTutorFound, setHasTutorFound] = useState(true);
  const [availableSchedules, setAvailableSchedules] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<any>();
  const [selectedSubject, setSelectedSubject] = useState<number>();
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const [bookNowLoading, setBookNowLoading] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<number>();
  const dispatch = useDispatch();

  const reviews = useTutorReviews(tutor_slug, true);

  // console.log("profile =====> ", profile)
  useEffect(() => {
    if (!tutor_slug) return;

    (async () => {
      const response = await dispatch(fetchTutorProfile(tutor_slug));

      if (!response) {
        setHasTutorFound(false);
      }
    })();
  }, [tutor_slug]);

  useEffect(() => {
    if (!selectedDate) return;

    setLoadingSchedules(true);

    (async () => {
      if (selectedDate) {
        const response = await fetchAvailableSchedules(
          formatYYYYMMDD(selectedDate, "-")
        );
        await setLoadingSchedules(false);
        console.log(response);

        setAvailableSchedules(response);
      }
    })();
  }, [selectedDate]);

  const fetchAvailableSchedules = async (date: string) => {
    try {
      setApplicationName("student");
      const response = await v2api.get(
        `/slots?tutorId=${tutor_slug}&date=${date}`
      );
      console.log(response.data);

      return response.data;
    } catch (e: any) {
      return console.log(e.message);
    }
  };

  const handleDateChange = async (date: Date) => {
    // Check weather the selected the slot is available or not

    setSelectedSchedule(null);

    await setSelectedDate(date);
  };

  const handleBookNow = async () => {
    if (!selectedDate || !selectedSchedule || !selectedSlot) return;

    setBookNowLoading(true);

    const data = {
      subject_id: selectedSubject,
      slot_id: selectedSlot,
    };

    const cartId = await addToCart(data);

    console.log(cartId);

    if (cartId) {
      router.push(`/student/checkout?id=${cartId}`);
      return;
    }

    toast.error(
      "Cannot book slot, It may be already booked. Please refresh and try again"
    );

    setBookNowLoading(false);
  };

  const [favAdd, setFavAdd] = useState(false);
  const addTutorToFavourites = () => {
    setFavAdd(true);
    api
      .post(`/student/favorite-tutors`, { tutor_id: tutor_slug })
      .then(() => toast.success("Tutor added to favourites"))
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add tutor to favourites");
      });
  };

  if (!hasTutorFound) {
    return <Error />;
  }

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="Student-tutor__profile__title__card">
                  <div className="me-3 tutor_image_card">
                    <img
                      src={profile?.image}
                      alt="..."
                      height="80px"
                      style={{ borderRadius: "7px" }}
                      className="image-fluid"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/image/img_avatar.png";
                      }}
                    />
                    <div className="star_rating_count">
                      <StarOutlinedIcon />
                      <p>{profile?.ratting}</p>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h3
                      className="Student-tutor__profile__title__card__name"
                      style={{ color: "#181818" }}
                    >
                      {profile?.fullname}
                    </h3>
                    <div
                      className="Student-tutor__profile__title__card__experience"
                      style={{ color: "#4E5A64" }}
                    >
                      {profile?.tutor_details?.experience} Years of experience
                    </div>
                    <div className="mb-0" style={{ color: "#00213D" }}>
                      Discipline/Subject:
                      <br />
                      {profile?.discipline.length === 0 && "No disciplines"}
                      {profile?.discipline.map(
                        (discipline: any) => `${discipline.name}, `
                      )}
                    </div>
                  </div>
                  <span className="Student-tutor__profile__title__card__favourite__button">
                    <FontAwesomeIcon
                      className="ms-3"
                      icon={faBookmark}
                      style={{
                        fontSize: "22px",
                        color:
                          profile?.is_favorite || favAdd
                            ? "#fbb017"
                            : "#BBBBBB",
                      }}
                      onClick={addTutorToFavourites}
                    />
                  </span>
                </div>
                <div className="Student-tutor__profile__about__title">
                  About {profile?.fullname}
                </div>

                <p className="Student-tutor__profile__about__content">
                  {profile?.tutor_details?.description}
                </p>
                <div>
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    url={
                      profile.video
                        ? process.env.NEXT_PUBLIC_API_ENDPOINT +
                          profile?.video.slice(1, profile?.video.length)
                        : ""
                    }
                    // url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
                  />
                </div>
                <br />
                <br />
                <ProfileExtras profile={profile} />
              </div>
              <div className="col-md-8">
                <div className="Student-profile__right_column">
                  <div className="Student-profile__right_column__title">
                    Available dates and time
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-6 p-0">
                          <Calendar
                            // activeStartDate={new Date()}
                            onChange={handleDateChange}
                            // maxDate={MAX_DATE}
                            minDate={new Date()}
                            // nextLabel={null}
                            // prevLabel={null}
                            next2Label={null}
                            prev2Label={null}
                          />
                        </div>
                        <div className="col-md-1 col-lg-1 p-0"></div>

                        <div className="col-md-5">
                          {selectedDate && (
                            <>
                              <div
                                className="mb-4"
                                style={{ color: "#4F4B4B", fontSize: "16px" }}
                              >
                                Available Time Slots in{" "}
                                {formatDDMMYYYY(selectedDate)}
                              </div>
                              {loadingSchedules ? (
                                "loading.."
                              ) : (
                                <>
                                  {availableSchedules && (
                                    <TimeSlots
                                      data={availableSchedules}
                                      onChange={(time: any) => {
                                        console.log(`time`, time);
                                        setSelectedSchedule(time);
                                      }}
                                      setSelectedSlot={setSelectedSlot}
                                    />
                                  )}
                                  {availableSchedules?.length === 0 &&
                                    "No slots available on selected day"}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="Student-profile__right_column__choosen__class__details">
                        <div className="col-md-4">
                          <div className="Student-profile__right_column__choosen__class__details__subject">
                            <div className="title">Select Subject</div>
                            <select
                              className="subject__select"
                              onChange={(event) =>
                                setSelectedSubject(Number(event.target.value))
                              }
                            >
                              <option value="">Select</option>

                              {profile.subjects.map((subject: any) => (
                                <option value={subject.id}>
                                  {subject.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="Student-profile__right_column__choosen__class__details__schedule p-3">
                            <div className="row w-100">
                              <button
                                style={{
                                  border: "#E3CFDF",
                                  backgroundColor: "#E3CFDF",
                                  color: "#F56753",
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                                onClick={(e) => setSelectedSchedule("")}
                              >
                                Clear
                              </button>
                              <div className="col-lg-6">
                                <div
                                  className="d-flex"
                                  style={{ color: "red" }}
                                >
                                  <svg
                                    id="calendar_2_"
                                    data-name="calendar (2)"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28.926"
                                    height="28.926"
                                    viewBox="0 0 28.926 28.926"
                                  >
                                    <path
                                      id="Path_24527"
                                      data-name="Path 24527"
                                      d="M25.2,2.26H22.6V.9a.9.9,0,0,0-1.808,0V2.26H8.136V.9A.9.9,0,1,0,6.328.9V2.26h-2.6A3.733,3.733,0,0,0,0,5.989V25.2a3.733,3.733,0,0,0,3.729,3.729H25.2A3.733,3.733,0,0,0,28.926,25.2V5.989A3.733,3.733,0,0,0,25.2,2.26ZM3.729,4.068h2.6v.9a.9.9,0,0,0,1.808,0v-.9H20.791v.9a.9.9,0,0,0,1.808,0v-.9h2.6a1.923,1.923,0,0,1,1.921,1.921V8.136H1.808V5.989A1.923,1.923,0,0,1,3.729,4.068ZM25.2,27.119H3.729A1.923,1.923,0,0,1,1.808,25.2V9.943H27.119V25.2A1.923,1.923,0,0,1,25.2,27.119Z"
                                      fill="#51bda5"
                                    />
                                  </svg>
                                  <p
                                    className="text-wallet m-0 ms-2"
                                    style={{ color: "#181818" }}
                                  >
                                    Chosen Date
                                  </p>
                                </div>
                                <div className="me-2 mt-3 ">
                                  <span
                                    style={{
                                      color: "#361C30",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {selectedDate
                                      ? formatDDMMYYYY(selectedDate)
                                      : "Choose a date :("}
                                  </span>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex ">
                                  <svg
                                    id="clock"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="27.029"
                                    height="27.029"
                                    viewBox="0 0 27.029 27.029"
                                  >
                                    <path
                                      id="Path_24519"
                                      data-name="Path 24519"
                                      d="M24.186,7.112a1.126,1.126,0,0,0-.523,1.5,11.147,11.147,0,0,1,1.115,4.9A11.262,11.262,0,1,1,13.515,2.252a11.127,11.127,0,0,1,6.992,2.43,1.126,1.126,0,1,0,1.4-1.763,13.517,13.517,0,1,0,5.122,10.6,13.377,13.377,0,0,0-1.34-5.879,1.125,1.125,0,0,0-1.5-.523Zm0,0"
                                      transform="translate(0 0)"
                                      fill="#fbb017"
                                    />
                                    <path
                                      id="Path_24520"
                                      data-name="Path 24520"
                                      d="M177.126,64A1.127,1.127,0,0,0,176,65.126V73.01a1.127,1.127,0,0,0,1.126,1.126h5.631a1.126,1.126,0,0,0,0-2.252h-4.5V65.126A1.127,1.127,0,0,0,177.126,64Zm0,0"
                                      transform="translate(-163.612 -59.495)"
                                      fill="#fbb017"
                                    />
                                  </svg>
                                  <p
                                    className="font-w600 text-wallet m-0 ms-2"
                                    style={{ color: "#181818" }}
                                  >
                                    Chosen Time
                                  </p>
                                </div>
                                <div className="me-4 mt-3">
                                  <span
                                    style={{
                                      color: "#361C30",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {selectedSchedule
                                      ? `${selectedSchedule.start} - ${selectedSchedule.end}`
                                      : "Choose a schedule"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end align-items-center mt-3"></div>
                </div>
              </div>
            </div>

            <div className="Student-tutor__profile__booking__section">
              <div className="Pre-Requiesites">
                <div className="Pre-Requiesites__title">Pre-Requiesites</div>

                {profile?.pre_requiesites.map((item: string) => (
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="Pre-Requiesites__item"
                  >
                    <CircleIcon
                      sx={{
                        fontSize: 10,
                        color: "white",
                        width: "10px",
                        border: "1px solid #924781",
                        borderRadius: "25px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;
                    {item}
                  </div>
                ))}
              </div>
              <div className="w-50 ">
                <p>
                  Note : A tutor should accept your booking to start your
                  classes. Otherways your amount will be reimbursed to your
                  credit points.
                </p>
                <p>Note : The Schedule may change during day-light-savings!.</p>
                <div className="d-flex justify-content-between">
                  <div style={{ width: "48%" }}>
                    <Button
                      className="btn w-100"
                      type="primary"
                      loading={bookNowLoading}
                      onClick={handleBookNow}
                      disabled={
                        !selectedDate || !selectedSchedule || !selectedSubject
                      }
                    >
                      Book now
                    </Button>
                  </div>
                  <div style={{ width: "48%" }}>
                    {/* <a href="/student/tutors-message"> */}
                    <a href={`/student/message/${profile?.uuid}`}>
                      <button
                        style={{ color: "#fff" }}
                        className="btn btn-warning w-100"
                      >
                        Message
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* {JSON.stringify(reviews.data)} */}
            <div className="reviews__title">Reviews</div>

            {reviews.isError && "Error"}

            <div className="mb-5"></div>
          </div>
        </Container>
      </StudentDashboardLayout>
    </>
  );
}

export default withAuthNew(TutorProfile, "student");
