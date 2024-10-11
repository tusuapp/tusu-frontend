import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faEnvelope,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQ } from "features/CMS/CMSSlice";
import { selectCMS } from "features/CMS/CMSSlice";
import AccordianItem from "components/accordianItem";

function Home() {
  const dispatch = useDispatch();
  const faq = useSelector(selectCMS).faq;

  useEffect(() => {
    dispatch(fetchFAQ());
    console.log(faq);
  }, []);
  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://use.fontawesome.com/releases/vVERSION/css/svg-with-js.css" rel="stylesheet"></link>
      </Head>
      {/* <Header /> */}
      <Header />
      &nbsp;
      <Container>
        <h3 className="small-header">FAQ and Support</h3>
        <p className="m-0">Didn't find the answer you were looking for? </p>
        <p>Contact our support center!</p>
        <div className="support">
          <div className="support-website">
            <p className="contact-details">
              {/* <i className="fa fa-globe fa-brand brand-bg-icon" /> */}
              <span className="brand-bg-icon me-3">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              <Link href="/">
                <a
                  className="text-decoration-none"
                  style={{ color: "#000", fontSize: "16px" }}
                >
                  Go to our website
                </a>
              </Link>
            </p>
            <p className="contact-details">
              {/* <i className="fa fa-envelope fa-brand brand-bg-icon" /> */}
              <span className="brand-bg-icon me-3">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <Link href="/contact">
                <a
                  className="text-decoration-none"
                  style={{ color: "#000", fontSize: "16px" }}
                >
                  Email Us
                </a>
              </Link>
            </p>
            <p className="contact-details">
              <span className="brand-bg-icon me-3">
                <FontAwesomeIcon icon={faFileAlt} />
              </span>
              {/* <i className="fa fa-file fa-brand brand-bg-icon " /> */}
              <Link href="/student/terms-and-condition">
                <a
                  className="text-decoration-none"
                  style={{ color: "#000", fontSize: "16px" }}
                >
                  Terms of Service
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="accordion accordion-flush" id="faq-accordion">
            {faq?.map((item: any, index: number) => (
              <AccordianItem
                title={item.question}
                body={item.answer}
                key={index}
              />
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
