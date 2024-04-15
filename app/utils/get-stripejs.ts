import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! ||
        "pk_test_51OnjvGFkKBA5pJbBqHlptytQ3sWUYypAwKBXraJaC0AGNkSnGgNnBpZRZOOgUYm4kNWNRPrffHFXB8eLKO7dhJSP00EABT73PA"
    );
  }
  return stripePromise;
};

export default getStripe;
