const Footer = () => {
  return (
    <>
      <footer className="mt-auto">
        <div className="container-fluid bg-light text-center text-lg-start ">
          <div className="container p-4 footer py-5">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <img
                  src="/image/logo.svg"
                  className="pl-5 footer-logo"
                  height={40}
                  alt=""
                />
                <p className="mt-3">
                  Tusu empowers learners worldwide with personalised 1-to-1
                  language coaching and IELTS preparation — turning hesitation
                  into fluency.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 col-6 mb-4 mb-md-0 mt-23">
                <h5 className="footer-head mb-2">Company</h5>
                <ul className="list-unstyled">
                  <li className="footer-item">
                    {" "}
                    <a href="/about">About Us</a>
                  </li>
                  <li className="footer-item">
                    {" "}
                    <a href="/contact">Contact US</a>
                  </li>
                  <li className="footer-item">
                    <a href="/student/faq">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-6 mb-4 mb-md-0 mt-23">
                <h5 className="footer-head">Useful Links</h5>
                <ul className="list-unstyled mb-0">
                  <li className="footer-item">
                    <a href="/our-tutors">Browse Language Tutors</a>
                  </li>
                  <li className="footer-item">
                    <a href="/signup/tutor">Become a Tutor</a>
                  </li>
                  <li className="footer-item">
                    <a href="/student/terms-and-condition">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="/student/privacy-policy">Privacy Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-23">
                <h5 className="footer-head mb-2">Follow Us</h5>
                <p>
                  Practice tips, IELTS strategies and learner stories — straight
                  to your feed.
                </p>
                <div className="social-media-icons">
                  <a href="#!" className="pr-1">
                    <img src="/image/social/twitter.png" />
                  </a>
                  {/* Facebook */}
                  <a href="#!">
                    <img src="/image/social/facebook.png" />
                  </a>
                  {/* Linked in */}
                  <a href="#!">
                    <img src="/image/social/linkedin.png" />
                  </a>
                  {/* Instagram */}
                  <a href="#!">
                    <img src="/image/social/instagram.png" />
                  </a>
                  {/* youtbe */}
                  <a href="#!">
                    <img src="/image/social/youtube.png" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid"
          style={{ backgroundColor: "#fff", fontSize: "13px" }}
        >
          <div className="container">
            <div className="copyright	p-3">
              Copyright © 2026 Tusu. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
