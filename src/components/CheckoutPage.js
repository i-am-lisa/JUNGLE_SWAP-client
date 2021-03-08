import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

class CheckoutPage extends Component {
  
  render() {
    // console.log("PLANT:", plant)
    const promise = loadStripe("pk_test_51IQBseEqJqsi8ZD5sJWeLyoMPSxJBKvGcgO3Srmc5UOSqAT6Zp44JmszMSiJGqO9R3eleWrCNyv9TOv9IWmoSLyQ00XHsxNLVR");
    return (
      <div className="container row mt-5">
        <div className="mt-5 col-11 col-md-6 offset-1 offset-md-5">
          <Elements stripe={ promise }>
            <CheckoutForm/>
          </Elements>
        </div>
      </div>
    );
  }
}

export default CheckoutPage;