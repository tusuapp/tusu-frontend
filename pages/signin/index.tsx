import Header from "../../components/header";
import Footer from "../../components/footer";
import Head from "next/head";
import Link from "next/link";

const ChooseLogin: React.FC = () => {
  return (
    <>
      <Header title={"Choose sign up"} />
      <div className="min-full-height bg-login-page d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div className="choose-role-card bg-white px-0 py-5">
                <div className="text-center">
                  <img src="/image/student.png" />
                </div>
                <div className="text-center">
                  <Link href="/signin/student">
                    <a className="btn btn-brandd mt-5">I am a student</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="choose-role-card bg-white px-0 py-5">
                <div className="text-center">
                  <img src="/image/tutor.png" />
                </div>
                <div className="text-center">
                  <Link href="/signin/tutor">
                    <a className="btn btn-brandd mt-5 w-50">I am a tutor</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseLogin;
