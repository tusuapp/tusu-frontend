import Header from "../components/header";
import Container from "../components/container";
import Footer from "../components/footer";
import Head from "next/head";
import HeroSection from "../components/@next/templates/heroSection";
import { useQuery } from "react-query";
import { api } from "../api";
import TutorCardWithHover from "../modules/landing-page/components/TutorCardWithHover";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSlice";
import TutorCard from "components/TutorCard";
import { useForm } from "react-hook-form";
import router from "next/router";

function Home() {
  const { user } = useSelector(selectAuth);

  const allTutors = useQuery("allTutors", () =>
    api.get("/student/tutors?type=all-tutors").then((res) => res.data)
  );

  const onSubmit = (data: any) => {
    router.push(`/student/contact/success`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <HeroSection />
      <Container>
        <section id="about" className="bg-white mt-5">
          <div className="container">
            <div className="about-us">
              <h2 className="heading text-brand section-title text-center font-weight-bold">
                About Tusu
              </h2>
              <p className="sub-heading text-center mb-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. <br />
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s
              </p>
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="banner-img"
                    src="/image/about.png"
                    alt="About TUSU"
                    width="100%"
                  />
                </div>
                <div className="col-md-8">
                  <p className="banner-text">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                  <Link href={`/about`}>
                    <button
                      className="btn btn-brand "
                      style={{ borderRadius: "50px" }}
                    >
                      Read
                      <img
                        src="/icons/arrow.png"
                        style={{ marginLeft: "20px" }}
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Out Tutors */}
        <section id="our-tutors">
          <div className="container">
            <div className="tutors">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h3
                  className="text-brand"
                  style={{ fontSize: "35px", fontWeight: 600 }}
                >
                  Our Tutors
                </h3>
                <a
                  href="/our-tutors"
                  className="text-decoration-none"
                  style={{ color: "#222222", fontWeight: 500 }}
                >
                  View all
                </a>
              </div>
              <div className="row justify-content-center">
                <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
                  {!user
                    ? allTutors?.data?.result?.map(
                        (tutor: any, index: number) => (
                          <Link href={`/signin`}>
                            <div className="mb-4" style={{ cursor: "pointer" }}>
                              <TutorCardWithHover
                                tutorName={tutor.name}
                                profilePicture={tutor.image}
                                tutorSubject={tutor.subject}
                                rating={tutor.ratting}
                                key={index}
                              />
                            </div>
                          </Link>
                        )
                      )
                    : allTutors?.data?.result?.map(
                        (tutor: any, index: number) => (
                          <Link href={`/student/tutors/${tutor.id}`}>
                            {/* <div
                              className="col mb-5 tutor__list_column"
                              key={index}
                            >
                              <TutorCardWithHover
                                id={tutor.id}
                                tutorName={tutor.name}
                                profilePicture={tutor.image}
                                tutorSubject={tutor.subject}
                                rating={tutor.rating}
                              />
                            </div> */}
                            <div className="mb-4 mouse">
                              <TutorCard
                                tutorName={tutor.name}
                                profilePicture={tutor.image}
                                tutorSubject={tutor.subject}
                                rating={tutor.ratting}
                                key={index}
                              />
                            </div>
                          </Link>
                        )
                      )}
                  {}
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
        </section>
      </Container>

      <div className="testimonials-clean">
        <section id="testimonials" className="mt-1-5">
          <div
            className="container-fluid"
            style={{ backgroundColor: "#E7E7E7" }}
          >
            <div className="container">
              <div className="intro">
                <h2 className="text-center text-brand">Testimonials</h2>
                <p
                  className="text-center"
                  style={{
                    color: "#515259",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Our customers love us! Read what they have to say below.
                  Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque
                  ut laoreet vitae.
                </p>
              </div>
              <div className="row people">
                <div className="col-md-6 col-lg-6 item">
                  <div className="box">
                    <p className="description">
                      Aenean tortor est, vulputate quis leo in, vehicula rhoncus
                      lacus. Praesent aliquam in tellus eu gravida. Aliquam
                      varius finibus est.
                    </p>
                  </div>
                  <div className="d-flex justify-content-end mt-5">
                    <div>
                      <h5 className="name text-uppercase">Ben Johnson</h5>

                      <p className="title">CEO of Company Inc.</p>
                    </div>
                    <div
                      className="rounded-circle ms-4"
                      style={{ height: "75px", width: "75px" }}
                    >
                      <img src="/image/tutors/1.png" />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-6 item">
                  <div className="box">
                    <p className="description">
                      Aliquam varius finibus est, et interdum justo suscipit.
                      Vulputate quis leo in, vehicula rhoncus lacus. Praesent
                      aliquam in tellus eu.
                    </p>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <div>
                      <h5 className="fw-bold text-uppercase">Emily Clark</h5>

                      <p className="title">Owner of Creative Ltd.</p>
                    </div>
                    <div
                      className="rounded-circle ms-4"
                      style={{ height: "75px", width: "75px" }}
                    >
                      <img
                        style={{ overflow: "hidden" }}
                        src="/image/tutors/8.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* End Section testimonial */}
      {/* Start Contact Form */}
      <section id="contact-us" className="mb-55 pt-42">
        <div className="container">
          <div className="row ">
            <div className="col-md-4 text-center d-flex align-items-center hc-img">
              <img src="/image/contact.png" width="100%" />
            </div>
            <div className="col-md-8">
              <div
                className="contact-form contact-home ms-sm-0 ms-lg-5 px-5"
                style={{ borderRadius: "20px", backgroundColor: "#F3F3F3" }}
              >
                <div className="row">
                  <div className="col-md-2 title-transform">
                    <div className="rotate ml-2">
                      <h3
                        className="mb-4 text-brand"
                        style={{ fontWeight: 600, fontSize: "35px" }}
                      >
                        Contact Us
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-10 form-p-relative">
                    <form
                      className="m-2 py-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-60 p-2 px-3 m-0"
                        id="username"
                        {...register("name", {
                          required: "name required",
                          pattern: {
                            value:
                              /^(?!_)(?!\[)(?!\])(?!\\)(?!\^)[a-zA-z][a-zA-Z\s]*$/,
                            message: "Name should only contain letters",
                          },
                        })}
                      />
                      <br />
                      {errors.name && (
                        <small className="text-danger">
                          {errors.name.message}
                        </small>
                      )}
                      <br />
                      <input
                        type="text"
                        placeholder="E-Mail"
                        className="w-60 p-2 px-3 m-0"
                        {...register("email", {
                          required: "email required",
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "enter a valid email",
                          },
                        })}
                      />
                      <br />
                      {errors.email && (
                        <small className="text-danger">
                          {errors.email.message}
                        </small>
                      )}
                      <br />
                      <input
                        type="text"
                        placeholder="Moble"
                        className="w-60 p-2 px-3  m-0"
                        {...register("phone", {
                          required: "phone number required",
                          pattern: {
                            value:
                              /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                            message: "enter a valid phone number",
                          },
                        })}
                      />
                      <br />
                      {errors.phone && (
                        <small className="text-danger">
                          {errors.phone.message}
                        </small>
                      )}
                      <br />
                      <textarea
                        id="feddback"
                        title="Feedback"
                        rows={4}
                        className="ms-10  p-2 px-3 m-0"
                        placeholder="Message"
                        defaultValue={""}
                        {...register("message", {
                          required: "Message is Required",
                          minLength: {
                            value: 10,
                            message: "Minimum Required length is 10",
                          },
                          maxLength: {
                            value: 50,
                            message: "Maximum allowed length is 50 ",
                          },
                        })}
                      />
                      <br />
                      {errors.message && (
                        <small className="text-danger">
                          {errors.message.message}
                        </small>
                      )}
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-brand " type="submit">
                          Send
                        </button>
                      </div>
                    </form>
                    <img src="image/group66735.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
