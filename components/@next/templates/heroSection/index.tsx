import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              className="hero-image"
              src="/image/banner-1.png"
              // width="100%"
            />
            <h1 className="hero-title text-brand">
              World's Leading online <br />
              learning Platform
            </h1>
          </div>
          <div className="col-md-6">
            <div className="hero-content">
              <h3 className="hero-description">
                Find Suitable tutors from TUSU
              </h3>
              <h2 className="hero-subtitle">
                Trusted by<span className="hero-fs-35 fw-bold">5M+</span> USERS
              </h2>
            </div>
            <div className="hero-card">
              <h3 className="text-brand">
                We are now on <br />
                Android and iOS too!
              </h3>
              <p>A chance to attend your lessons anywhere from the world</p>
              <div className="d-flex">
                <div>
                  <img src="/image/appstore.png" />
                </div>
                <div className="px-3">
                  <img src="/image/gplay.png" />
                </div>
              </div>
              <p>Download FREE Android and iOS app now </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
