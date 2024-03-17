import { loadStripe } from "@stripe/stripe-js";

interface LineItem {
  quantity: number;
  price: string;
}

interface CheckoutData {
  lineItems: LineItem[];
}

export async function checkout({ lineItems }: CheckoutData) {
  let stripePromise: any = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_API_KEY ||
          "pk_test_51OnjvGFkKBA5pJbBqHlptytQ3sWUYypAwKBXraJaC0AGNkSnGgNnBpZRZOOgUYm4kNWNRPrffHFXB8eLKO7dhJSP00EABT73PA"
      );
    }
    return stripePromise;
  };
  const stripe = await getStripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
