import React from "react";
import LoginApple from "./Apple";
import LoginFacebook from "./Facebook";
import LoginGoogle from "./Google";

const SocialMediaLinks: React.FC = () => {
  return (
    <div>
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          // marginRight: "10px",
          paddingRight: "10px",
          flexWrap: "wrap"
        }}
      >
        <div
          className="btn me-1 "
          style={{
            paddingRight: "2px",
            marginRight: "150px",
            alignItems: "center",
            // marginLeft: "150px",
            // width: "350px",
            padding: "10px 20px 10px 0px",
          }}
        >
          <LoginGoogle />
        </div>
        <div>
          <LoginFacebook />
        </div>
        &nbsp; &nbsp; &nbsp;
        {/* <div>
          <LoginApple />
        </div> */}
      </div>
      {/* <LoginGoogle />
      <div
        className="btn me-0 text-end"
        style={{
          paddingRight: "17px",
          alignItems: "center",
        }}
      >
        <LoginGoogle />

        Sign in with Google
      </div>

      <div>
        <LoginFacebook />
        <img src="/icons/facebook-icon.svg" className="me-2" /> Sign in with
        Facebook
      </div>
      <div className="btn btn-social-auth apple">
        <img src="/icons/apple-icon.svg" className="me-2" />
        Sign in with Apple
      </div> */}
    </div>
  );
};

export default SocialMediaLinks;
