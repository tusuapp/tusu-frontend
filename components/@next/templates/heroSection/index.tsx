import React from "react";
import Link from "next/link";

const PROOF_POINTS = [
  "Native speakers",
  "Certified instructors",
  "IELTS specialists",
];

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-copy">
            <h1 className="hero-title">
              Master a new language &amp; ace the{" "}
              <span className="text-brand">IELTS</span> with expert 1-on-1
              tutoring
            </h1>

            <p className="hero-lead">
              Reach fluency faster or hit your target band score with
              personalised, online lessons. Connect with native speakers and
              certified instructors worldwide.
            </p>

            <div className="hero-actions">
              <Link href="/our-tutors">
                <a className="btn btn-brand hero-cta">Find your language tutor</a>
              </Link>
              <Link href="/signup/student">
                <a className="btn hero-cta hero-cta--ghost">
                  Book a trial lesson
                </a>
              </Link>
            </div>

            <ul className="hero-proof">
              {PROOF_POINTS.map((point) => (
                <li key={point}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="#924781"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-6 hero-visual">
            <img
              className="hero-image"
              src="/image/banner-1.png"
              alt="Student in a 1-on-1 online language lesson with a Tusu tutor"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
