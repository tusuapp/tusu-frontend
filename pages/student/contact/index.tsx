import Header from "../../../components/header";
import Container from "../../../components/container";
import Footer from "../../../components/footer";
import { useForm } from "react-hook-form";
import Head from "next/head";
import React, { useState } from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { api } from "../../../api";
import { toast } from "react-toastify";

function StudentContact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      name: name,
      message: message,
      email: email,
      phone: phone,
    };

    event.preventDefault();

    try {
      const response = await api.post("/contact-forms", data);
      if (response.status) {
        toast.success("Message sent successfully");
        router.push(`/student/contact/success`);
      }
    } catch (e) {
      toast.error("Somethiong went wrong");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header title={"Contact us"} />
      <Container>
        <div className="pt-5 pb-5">
          <h2 className="small-header mt-3">Contact Us</h2>
          <div className="row contact-us">
            <div className="col-md-4 contact-address p-5 justify-content-center align-items-center">
              <div className="text-center mb-3">
                <img src="/image/logo.png" className="contact-logo" />
              </div>
              <div className="contact-details">
                <div className="contact-email">
                  <div className="d-flex justify-content-start align-content-center">
                    <div className="white-bg-icon me-4">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div style={{ color: "#637381", fontSize: "15px" }}>
                      Email <br /> info@tusu.com
                    </div>
                  </div>
                </div>
                <div className="contact-phone  mt-3">
                  <div className="d-flex">
                    <div className="white-bg-icon me-4">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div style={{ color: "#637381", fontSize: "15px" }}>
                      Phone <br /> 9945251414
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h3 className="small-header">Get in touch with us</h3>
              {/* <form className="contact-form" onSubmit={handleSubmit(onSubmit)}> */}
              <form className="contact-form" >
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                  {errors.name && (
                    <small className="text-danger">
                      {errors.name.message}
                    </small>
                  )}
                <br />
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                <input
                  type="text"
                  className={`form-control ${errors.phone && "invalid"}`}
                  {...register("phone", {
                    pattern: {
                      value:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: "Invalid phone no",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("phone");
                  }}
                  id="mobile"
                  placeholder="Mobile"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
                <div className="form-group">
                  <label className="col-form-label"></label>
                  <textarea
                    placeholder="Message"
                    className={`form-control ${errors.message && "invalid"}`}
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
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  {errors.message && (
                    <small className="text-danger">
                      {errors.message.message}
                    </small>
                  )}
                </div>

                <button
                  className="btn btn-brand btn-submit float-end mt-3"
                  type="submit"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default StudentContact;
