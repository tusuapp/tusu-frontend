import React from "react";
import AppleLogin from "react-apple-login";

function LoginApple() {
  const clientId = "Your client Id";

  return (
    <div>
      <AppleLogin
        clientId={clientId}
        redirectURI={"https://redirectUrl.com"}
        responseType={"code"}
        responseMode={"query"}
        usePopup={false}
        designProp={{
          height: 42,
          width: 180,
          color: "black",
          border: false,
          type: "sign-in",
          border_radius: 15,
          scale: 1,
          locale: "en_US",
        }}
      />
    </div>
  );
}
export default LoginApple;
