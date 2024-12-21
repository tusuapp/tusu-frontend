import Header from "components/header";
import Container from "components/container";
import Footer from "components/footer";
import Head from "next/head";
import React from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import router from "next/router";

function Home() {
  const onSubmit = (data: any) => {
    // console.log(data)
    router.push(`/student/contact/success`);
  };

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   router.push(`/student/contact/success`);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   trigger,
  // } = useForm();

  return (
    <>
      <Head>
        <title>Tusu -Contact us</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container>
        <div className="mt-5"></div>
        <h2 className="small-header">Contact Us</h2>
        <div className="row">
          <div className="col-md-4 contact-address p-5 justify-content-center align-items-center">
            <div className="text-center mb-3">
              <img src="/image/logo.svg" className="contact-logo" height={40} />
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
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              {/* <label for="email">Email address</label> */}
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                // onChange={(e) => setName(e.target.value)}
                {...register("name", {
                  required: "name required",
                  pattern: {
                    value: /^(?!_)(?!\[)(?!\])(?!\\)(?!\^)[a-zA-z][a-zA-Z\s]*$/,
                    message: "Name should only contain letters",
                  },
                })}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                // onChange={(e) => setEmail(e.target.value)}
                {...register("email", {
                  required: "email required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
              <input
                type="text"
                className="form-control"
                // className={`form-control ${errors.phone && "invalid"}`}
                // {...register("phone", {
                //   pattern: {
                //     value:
                //       /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                //     message: "Invalid phone no",
                //   },
                // })}
                // onKeyUp={() => {
                //   trigger("phone");
                // }}
                id="mobile"
                placeholder="Mobile"
                // onChange={(e) => setPhone(e.target.value)}
                {...register("phone", {
                  required: "phone number required",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
              <div className="form-group">
                <label className="col-form-label"></label>
                <textarea
                  placeholder="Message"
                  // className={`form-control ${errors.message && "invalid"}`}
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
                  // onKeyUp={() => {
                  //   trigger("message");
                  // }}
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
                // onClick={handleClick}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>

      <Footer />
    </>
  );
}

export default Home;
