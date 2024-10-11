import React, { useEffect, useState } from "react";

type PasswordStrength =
  | "Very Weak"
  | "Weak"
  | "Medium"
  | "Strong"
  | "Very Strong";

const App: React.FunctionComponent = () => {
  // The password
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("Very Weak");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // This function will be triggered when the password input field changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.trim();
    setPassword(enteredValue);
  };

  useEffect(() => {
    if (password.length <= 4) {
      setPasswordStrength("Very Weak");
      setIsButtonDisabled(true);
    } else if (password.length <= 6) {
      setPasswordStrength("Weak");
      setIsButtonDisabled(true);
    } else if (password.length <= 8) {
      setPasswordStrength("Medium");
    } else if (password.length <= 12) {
      setPasswordStrength("Strong");
      setIsButtonDisabled(false);
    } else {
      setPasswordStrength("Very Strong");
      setIsButtonDisabled(false);
    }
  }, [password]);

  // Button handler function
  const buttonHandler = () => {
    alert("You have entered a strong enough password");
    // Do otehr things here
  };

  return (
    <div>

      {/* The input field */}
      <input
        type="password"
        value={password}
        onChange={inputHandler}
        placeholder="Enter you password"
        style={styles.password}
      />

      {/* This bar indicated the strength of the entered password */}
      <div style={styles.statusBar}>
        <div
          style={{
            ...styles.strength,
            width: `${(password.length / 16) * 100}%`,
          }}
        ></div>
      </div>

      {/* Password strength message */}
      <div style={styles.message}>{passwordStrength}</div>

      {/* This button is only clickable when the entered password is strong enough */}
      {/* <button
        style={
          isButtonDisabled
            ? { ...styles.button, ...styles.disabledButton }
            : styles.button
        }
        disabled={isButtonDisabled}
        onClick={buttonHandler}
      >
        CONTINUE
      </button> */}
    </div>
  );
};

// Styling
const styles = {
  container: {
    width: 400,
    padding: "30px 90px",
    margin: "50px auto",
    backgroundColor: "#f4ff81",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  password: {
    width: 300,
    padding: "8px 10px",
    border: "1px solid #444",
    borderRadius: "10px",
    outline: "none",
  },
  statusBar: {
    width: 300,
    height: 10,
    marginTop: 20,
    background: "#fff",
    border: "1px solid #444",
    borderRadius: "5px",
  },
  strength: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "orange",
  },
  message: {
    padding: "20px 0",
  },
  button: {
    padding: "15px 30px",
    cursor: "pointer",
    background: "purple",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "30px",
  },
  disabledButton: {
    cursor: "not-allowed",
    opacity: 0.3,
  },
};
export default App;
