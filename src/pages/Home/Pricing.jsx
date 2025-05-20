import { useState } from "react";
import { CheckIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleBuyClick = (url) => {
    window.open(url, "_blank");
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-white px-4 sm:px-6 lg:px-10 my-6">
      <div className="mx-auto max-w-7xl pb-10">
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-center text-black md:text-4xl">
          Our Pricing
        </h2>

        <div className="relative mt-12 flex flex-col items-center gap-y-6 sm:gap-y-10 lg:flex-row lg:justify-center lg:gap-x-10">
          {/* Full Access Plan */}
          <div className="relative">
            <div className="w-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:w-auto sm:p-10 bg-white text-black">
              <h3 className="text-xl font-bold">
                Full Access to ArbiPair & ArbiTrack
              </h3>
              <ul className="mt-6 space-y-4 text-base text-black">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <span className="ml-3">
                    Full access to ArbiPair & ArbiTrack for seamless signals.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <span className="ml-3">
                    Signal updates every 5 minutes, ensuring real-time trading
                    opportunities.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <span className="ml-3">
                    New trading and arbitrage strategies added regularly to
                    elevate your trading.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <span className="ml-3">
                    7 Day Free Trial included with all subscriptions.
                  </span>
                </li>
              </ul>
              <h3 className="mt-6 text-lg font-bold text-black">
                Simple Price
              </h3>
              <p className="mt-6 text-sm text-gray-600">
                Unmatched Value — A single profitable trade can pay for your
                subscription many times over.
              </p>
            </div>
          </div>

          {/* Monthly Subscription */}
          <div className="relative">
            <span className="absolute top-2 right-2 rounded-md bg-green-500  px-1.5 py-0.5 text-xs font-medium text-white">
              7 Day Free Trial
            </span>
            <div className="w-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:w-auto sm:p-10 bg-[hsl(0,0%,95%)] text-black">
              <h3 className="text-xl font-bold">Monthly Subscription</h3>
              <div className="mt-4 flex flex-col items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-black">
                  $49
                </span>
                <span className="text-lg text-black line-through">$120</span>
                <span className="mt-2 rounded-md bg-[hsl(203,144%,46%)] px-2 font-medium text-white">
                  59% OFF!
                </span>
              </div>
              <p className="mt-6 text-base text-black">
                Full access for a month. Auto renews every month.
              </p>
              <button
                onClick={() =>
                  handleBuyClick(
                    "https://whop.com/checkout/plan_9RzOL8KjwzHS8/"
                  )
                }
                className="mt-8 block rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Get Access
              </button>
            </div>
          </div>

          {/* 6-Month Subscription */}
          <div className="relative">
            <span className="absolute top-2 right-2 rounded-md bg-green-500 px-1.5 py-0.5 text-xs font-medium text-white">
              7 Day Free Trial
            </span>
            <div className="w-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:w-auto sm:p-10 bg-[hsl(0,0%,95%)] text-black">
              <h3 className="text-xl font-bold">6-Month Subscription</h3>
              <div className="mt-4 flex flex-col items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-black">
                  $249
                </span>
                <span className="text-lg text-black line-through">$650</span>
                <span className="mt-2 rounded-md bg-[hsl(203,144%,46%)] px-2 font-medium text-white">
                  62% OFF!
                </span>
              </div>
              <p className="mt-6 text-base text-black">
                Full access for 6 months. Auto renews every 6 months.
              </p>
              <button
                onClick={() =>
                  handleBuyClick(
                    "https://whop.com/checkout/plan_oo91x9FgSm2jL/"
                  )
                }
                className="mt-8 block rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Get Access
              </button>
            </div>
          </div>
        </div>

        {/* Post-payment information */}
        <div className="mt-12 text-center text-base text-gray-700 max-w-2xl mx-auto">
          <p>
            After subscribing, you will receive an email from{" "}
            <strong>hello@arbilo.com</strong> within 24 hours containing your
            login credentials and a link to access the platform.
          </p>
          {/* <p className="mt-2">Check your Spam or Junk folder if the email is not in your inbox.</p> */}
        </div>

        {/* Modal */}
        <AlertDialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Payment Gateway Coming Soon!</AlertDialogTitle>
              <AlertDialogDescription>
                Our payment gateway is currently under development. Stay tuned
                for updates!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseModal}>
                Close
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleCloseModal}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
