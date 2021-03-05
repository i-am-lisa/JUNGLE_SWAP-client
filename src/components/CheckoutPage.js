import React, { Component } from 'react'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export default class CheckoutPage extends Component {

    render() {

        const promise = loadStripe("pk_test_51IQBseEqJqsi8ZD5sJWeLyoMPSxJBKvGcgO3Srmc5UOSqAT6Zp44JmszMSiJGqO9R3eleWrCNyv9TOv9IWmoSLyQ00XHsxNLVR");

        return (
            <div>
                 <Elements stripe={promise}>
                    <CheckoutForm />
                </Elements>
            </div>
        )
    }
}
