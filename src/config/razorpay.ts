import { createPaymentOrder, verifyPayment } from "./myProfileApi";
import type { MyProfileResponse } from "./myProfileApi";

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

interface RazorpaySuccess {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface RazorpayInstance {
    open: () => void;
    on: (event: "payment.failed", cb: (resp: { error?: { description?: string } }) => void) => void;
}

declare global {
    interface Window {
        Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
    }
}

export class PaymentCancelledError extends Error {
    constructor() {
        super("Oops ! Your Payment was Unsuccessful. You can Login any time and complete your payment from ‘My Profile’ (on the navigation bar) to Publish your Profile.");
    }
}

let scriptPromise: Promise<void> | null = null;

function loadCheckout(): Promise<void> {
    if (window.Razorpay) return Promise.resolve();
    scriptPromise ??= new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = CHECKOUT_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
            scriptPromise = null;
            reject(new Error("Could not load the payment page. Please check your connection and try again."));
        };
        document.body.appendChild(script);
    });
    return scriptPromise;
}

/** Creates an order, opens Razorpay Checkout and verifies the payment on the server. Resolves when the profile is live. */
export async function payListingFee(): Promise<MyProfileResponse> {
    const [order] = await Promise.all([createPaymentOrder(), loadCheckout()]);
    const Razorpay = window.Razorpay;
    if (!Razorpay) throw new Error("Could not load the payment page. Please try again.");

    const result = await new Promise<RazorpaySuccess>((resolve, reject) => {
        const rzp = new Razorpay({
            key: order.keyId,
            order_id: order.orderId,
            amount: order.amount,
            currency: order.currency,
            name: "PROchure",
            description: "Profile listing fee",
            prefill: order.prefill,
            theme: { color: "#55374a" },
            handler: resolve,
            modal: { ondismiss: () => reject(new PaymentCancelledError()) },
        });
        rzp.on("payment.failed", (resp) => {
            // Checkout stays open so the user can retry; we only surface the reason if they close it.
            console.warn("Razorpay payment failed", resp.error?.description);
        });
        rzp.open();
    });

    return verifyPayment({
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
    });
}

export const formatFee = (paise: number) => `₹${(paise / 100).toLocaleString("en-IN")}`;
