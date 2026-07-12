import Header from "components/header";
import Container from "components/container";
import Seo from "components/seo";
import { buildBreadcrumbs } from "consts/site";
import HeroSection from "components/@next/templates/heroSection";
import { useQuery } from "react-query";
import { api } from "api";
import Link from "next/link";
import { useSelector } from "react-redux";
import TutorCard from "components/TutorCard";
import { selectAuth } from "features/auth/authSlice";
import React from "react";
import TutorCardWithHover from "modules/landing-page/components/TutorCardWithHover";

function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Tusu — our mission to make expert, personalised language coaching and IELTS preparation accessible to every learner, through dedicated 1-on-1 tutoring."
        canonical="/about"
        jsonLd={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <Header />
      <Container>
        <section id="about" className="bg-white mt-5">
          <div className="container">
            <div className="about-us">
              <h2 className="heading text-brand section-title text-center font-weight-bold">
                Redefining language learning
              </h2>
              <p className="sub-heading text-center mb-5">
                We connect motivated learners with world-class language
                educators for dedicated, 1-on-1 tutoring — built around your
                level and your goals.
              </p>
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
                  <p className="banner-text">
                    At Tusu, we know the fastest way to learn a language is
                    through active conversation and personalised feedback.
                    Instead of crowded classrooms where you rarely get to speak,
                    every Tusu lesson is a focused, one-on-one session with an
                    educator dedicated entirely to you.
                  </p>
                  <p className="banner-text">
                    Whether your goal is conversational confidence for travel,
                    mastering complex grammar, or rigorous IELTS preparation, our
                    tutors tailor each lesson to where you are today and where you
                    want to be. Our instructors are carefully vetted native
                    speakers and certified professionals who know how to build
                    fluency, sharpen pronunciation and coach you through the exact
                    skills the IELTS examiners look for.
                  </p>
                  <p className="banner-text">
                    Say goodbye to crowded language classes — and start speaking
                    from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Out Tutors */}
      </Container>

      {/* End Section testimonial */}
      {/* Start Contact Form */}
    </>
  );
}
export default About;
