import React from "react";
import FacebookLogin from "react-facebook-login";

function LoginFacebook() {
  const appId = "835026967151674";
  const responseFacebook = (response: any) => {
    console.log(response);
  };

  return (
    <div>
      <FacebookLogin
        textButton="Sign in with Facebook"
        appId={appId}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
        buttonStyle={{
          backgroundColor: "#3b5998",
          color: "white",
          width: "200px",
          height: "44px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}
export default LoginFacebook;
