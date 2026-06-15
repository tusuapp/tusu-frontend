import Header from "../../components/header";
import Footer from "../../components/footer";
import Seo from "../../components/seo";
import Link from "next/link";

const ChooseLogin: React.FC = () => {
  return (
    <>
      <Seo
        title="Sign Up"
        description="Join Tusu as a student to learn from expert tutors, or sign up as a tutor to teach online and grow your income."
        canonical="/signup"
      />
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
                  <Link href="/signup/student">
                    <a className="btn btn-brandd  mt-5">I am a student</a>
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
                  <Link href="/signup/tutor">
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
