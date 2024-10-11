import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import Button from "@mui/material/Button";

function Google() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log("TokenResponse:", tokenResponse),
    onError: (error) => console.log("Error:", error),
  });
  return (
    <div className="google-btn-wrap me-lg-2">
      <Button
        style={{
          color: "#000",
          boxShadow: "0px 1px 3px #0000004a",
          height: "48px",
          padding: "13px 8px"
        }}
        className="btn w-100"
        title="Sign in with Google"
        variant="outlined"
        onClick={() => login()}
      >
        <img
          src="/image/GLogo.svg" className="me-2"
        />
        Sign in with Google
      </Button>
    </div>
  );
}
export default Google;
