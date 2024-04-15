"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! ||
    "pk_test_51OnjvGFkKBA5pJbBqHlptytQ3sWUYypAwKBXraJaC0AGNkSnGgNnBpZRZOOgUYm4kNWNRPrffHFXB8eLKO7dhJSP00EABT73PA"
);

type Props = {};

const ProceedPage = (props: Props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default ProceedPage;
