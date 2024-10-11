import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        <div className="slick-arrow ">
          <h6>January</h6>
        </div>
        <div>
          <h6>February</h6>
        </div>
        <div>
          <h6>March</h6>
        </div>
        <div>
          <h6>April</h6>
        </div>
        <div>
          <h6>May</h6>
        </div>
        <div>
          <h6>June</h6>
        </div>
        <div>
          <h6>July</h6>
        </div>
        <div>
          <h6>August</h6>
        </div>
        <div>
          <h6>September</h6>
        </div>
        <div>
          <h6>October</h6>
        </div>
        <div>
          <h6>November</h6>
        </div>
        <div>
          <h6>December</h6>
        </div>
      </Slider>
    </div>
  );
}
