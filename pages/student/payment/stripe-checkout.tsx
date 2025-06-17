import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
function App() {
  async function handleToken(token: { id: any }) {
    console.log(token);
    await axios
      .post("http://localhost:8080/v2/api/payments/stripe/charge", "", {
        headers: {
          token: token.id,
          amount: 500,
        },
      })
      .then(() => {
        alert("Payment Success");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="App">
      <Stripe
        stripeKey="sk_test_51MNzxoSENC2ebtoEDwsTy6jaF9atPHrYv8bElPv0fL4fWkEEbzZU85EiXvMZ4pjr0bW1AXUiwtzHASaqPoLBOhPb00WF7BRNNx"
        token={handleToken}
      />
    </div>
  );
}
export default App;
