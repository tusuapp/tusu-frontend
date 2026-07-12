import Header from "../components/header";
import Container from "../components/container";
import Footer from "../components/footer";
import Seo from "../components/seo";
import HeroSection from "../components/@next/templates/heroSection";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../consts/site";
import { useQuery } from "react-query";
import { api } from "../api";
import TutorCardWithHover from "../modules/landing-page/components/TutorCardWithHover";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSlice";
import TutorCard from "components/TutorCard";
import { useForm } from "react-hook-form";
import router from "next/router";
import "react-phone-input-2/lib/style.css";

const WHY_TUSU = [
  {
    title: "Certified language experts",
    text: "Learn from carefully vetted native speakers and certified professionals who know how to build your fluency and sharpen your pronunciation.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 15a5 5 0 100-10 5 5 0 000 10z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8.5 14l-1 7 4.5-2.5L16.5 21l-1-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Targeted IELTS preparation",
    text: "Specialised coaching for IELTS Reading, Writing, Listening and Speaking so you walk into the exam ready to hit your target band score.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 5.5A1.5 1.5 0 015.5 4H11v16H5.5A1.5 1.5 0 014 18.5v-13z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M20 5.5A1.5 1.5 0 0018.5 4H13v16h5.5a1.5 1.5 0 001.5-1.5v-13z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Flexible scheduling",
    text: "Book lessons across time zones to fit your life. Morning, noon or night — your global tutor network is ready when you are.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7.5V12l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const IELTS_SKILLS = ["Reading", "Writing", "Listening", "Speaking"];

const TESTIMONIALS = [
  {
    quote:
      "Tusu helped me jump from a 6.0 to a 7.5 on my IELTS Speaking test! My tutor knew exactly what the examiners look for and gave me the personalised practice I needed.",
    name: "Ahmed K.",
    role: "University Applicant",
    avatar: "/image/tutors/1.png",
  },
  {
    quote:
      "I always felt too shy to speak, but the 1-on-1 environment on Tusu changed everything. My tutor is so encouraging, and I'm finally having real conversations.",
    name: "Elena R.",
    role: "Language Enthusiast",
    avatar: "/image/tutors/8.png",
  },
];

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
      <Seo
        titleAsIs
        title="Tusu — Expert Language Tutors & IELTS Preparation, 1-on-1 Online"
        description="Learn a new language or prepare for the IELTS with certified, native-speaking tutors. Personalised 1-on-1 online lessons built around your level and goals."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": ["Organization", "EducationalOrganization"],
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/image/logo.svg`,
            description:
              "Online language tutoring and IELTS preparation with certified, native-speaking tutors through personalised 1-on-1 lessons.",
            knowsAbout: [
              "Language learning",
              "IELTS preparation",
              "English speaking",
              "Online tutoring",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/our-tutors?search={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <Header />
      <HeroSection />
      <Container>
        <section id="about" className="bg-white mt-5">
          <div className="container">
            <div className="about-us">
              <div className="row align-items-center g-5">
                <div className="col-md-5">
                  <div className="about-media">
                    <img
                      className="banner-img"
                      src="/image/about.png"
                      alt="A Tusu language tutor guiding a student through a lesson"
                      width="100%"
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <span className="eyebrow">Our method</span>
                  <h2 className="section-title text-brand font-weight-bold">
                    Redefining language learning
                  </h2>
                  <p className="banner-text">
                    At Tusu, we know the fastest way to learn a language is
                    through active conversation and personalised feedback. We
                    connect motivated learners with world-class educators for
                    dedicated, 1-on-1 tutoring.
                  </p>
                  <p className="banner-text">
                    Whether your goal is conversational confidence for travel,
                    mastering complex grammar, or rigorous IELTS preparation, our
                    platform is tailored around your current level and goals. Say
                    goodbye to crowded classes — and start speaking from day one.
                  </p>
                  <Link href={`/about`}>
                    <a className="btn btn-brand about-cta">
                      Learn more about our method
                      <img
                        src="/icons/arrow.png"
                        alt=""
                        style={{ marginLeft: "16px" }}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Tusu */}
        <section id="why-tusu" className="why-tusu">
          <div className="container">
            <div className="text-center section-head">
              <span className="eyebrow">Why choose Tusu</span>
              <h2 className="section-title text-brand font-weight-bold">
                Built for real progress, not busywork
              </h2>
              <p className="sub-heading">
                Everything about a Tusu lesson is designed to move you closer to
                fluency — or your target band score.
              </p>
            </div>

            <div className="row g-4">
              {WHY_TUSU.map((feature) => (
                <div className="col-md-4" key={feature.title}>
                  <div className="feature-card h-100">
                    <span className="feature-card__icon">{feature.icon}</span>
                    <h3 className="feature-card__title">{feature.title}</h3>
                    <p className="feature-card__text">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IELTS Preparation band */}
        <section id="ielts-prep" className="ielts-band">
          <div className="container">
            <div className="ielts-band__inner">
              <div className="row align-items-center g-4">
                <div className="col-lg-7">
                  <span className="eyebrow eyebrow--light">IELTS preparation</span>
                  <h2 className="ielts-band__title">
                    Targeted coaching for every section of the exam
                  </h2>
                  <p className="ielts-band__text">
                    Work with examiners and specialists who know exactly what the
                    IELTS panel is looking for. Build the skills, timing and
                    confidence to reach your target band across all four sections.
                  </p>
                  <div className="ielts-band__actions">
                    <Link href="/our-tutors">
                      <a className="btn ielts-band__cta">Find an IELTS tutor</a>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="ielts-skills">
                    {IELTS_SKILLS.map((skill) => (
                      <div className="ielts-skill" key={skill}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="#ffffff"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our Tutors */}
        <section id="our-tutors">
          <div className="container">
            <div className="tutors">
              <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
                <div className="tutors__head">
                  <span className="eyebrow">Meet your mentors</span>
                  <h3
                    className="text-brand"
                    style={{ fontSize: "35px", fontWeight: 600 }}
                  >
                    Meet your future language mentors
                  </h3>
                  <p className="tutors__sub">
                    Browse our highly-rated instructors and find the perfect
                    match for your learning style and target language.
                  </p>
                </div>
                <a
                  href="/our-tutors"
                  className="text-decoration-none tutors__viewall"
                  style={{ color: "#222222", fontWeight: 500 }}
                >
                  View all instructors →
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
          <div className="container-fluid testimonials-bg">
            <div className="container">
              <div className="intro text-center section-head">
                <span className="eyebrow">Success stories</span>
                <h2 className="text-center text-brand">
                  Success stories from our learners
                </h2>
                <p className="sub-heading">
                  Real results from students who achieved their language goals
                  with Tusu.
                </p>
              </div>
              <div className="row people justify-content-center g-4">
                {TESTIMONIALS.map((review) => (
                  <div className="col-md-6 col-lg-5 item" key={review.name}>
                    <figure className="review-card h-100">
                      <div className="review-card__stars" aria-hidden="true">
                        ★★★★★
                      </div>
                      <blockquote className="review-card__quote">
                        “{review.quote}”
                      </blockquote>
                      <figcaption className="review-card__author">
                        <img
                          className="review-card__avatar"
                          src={review.avatar}
                          alt={review.name}
                        />
                        <span>
                          <strong>{review.name}</strong>
                          <em>{review.role}</em>
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* End Section testimonial */}
      {/* Start Contact Form */}
      <section id="contact-us" className="mb-55 pt-42">
        <div className="container">
          <div className="text-center section-head">
            <span className="eyebrow">Contact us</span>
            <h2 className="section-title text-brand font-weight-bold">
              Have questions about your language journey?
            </h2>
            <p className="sub-heading">
              Drop us a message and our support team will help you find the
              right path.
            </p>
          </div>
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
