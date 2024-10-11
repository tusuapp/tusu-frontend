import Header from "components/header";
import Container from "components/container";
import Head from "next/head";
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
        <Head>
          <title>Tusu - Student | Dashboard</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
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
                    <button className="btn btn-brand ">
                      Read 
                      {/* <img src="/icons/arrow.png" style={{marginLeft:"10px"}} /> */}
                    </button>
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
  }export default About