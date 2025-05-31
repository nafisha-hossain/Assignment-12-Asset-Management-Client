import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import CheckoutForm from './CheckoutForm';

const packageData = [
  {
    id: '1',
    title: 'Base',
    price: 5,
    description: "Just Starting Out? This Plan's Got Your Back.",
    maxEmployee: 5,
  },
  {
    id: '2',
    title: 'Regular',
    price: 8,
    description: 'Growing Team? This Plan Scales with You.',
    maxEmployee: 10,
  },
  {
    id: '3',
    title: 'Premium',
    price: 15,
    description: 'Take Website Asset Management to the Next Level.',
    maxEmployee: 20,
  },
];

const stripePromise = loadStripe(
  'pk_test_51RUKSjR1nuSQMM1nfLfaR9j5EbrqiPpTlp9r7azMRDH2FeCYYUb0nmbwnYJQDArFnMEuufQlGXVMzMX5qCLMcTtZ003pnEef2M'
);

const Payment = () => {
  const [loggedInUser, isPending] = useLoggedInUser();

  const [price, setPrice] = useState(null);
  const [isPay, setIsPay] = useState(false);

  const handleChoosePlan = (item) => {
    setPrice(item.price);
    setIsPay(true);
  };

  if (isPending) return <LoadingSpinner h={'90vh'} />;

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          Choose Your Plan
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packageData.map((item) => {
            const isSelected = isPay && item.price === price;

            return (
              <div
                key={item.id}
                className={`flex cursor-pointer flex-col justify-between rounded-2xl border
                  ${
                    isSelected
                      ? 'border-blue-600 bg-gradient-to-tr from-blue-50 to-blue-100 shadow-lg'
                      : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md'
                  }
                  p-8 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                `}
                onClick={() => handleChoosePlan(item)}
              >
                <div>
                  {/* Plan badge */}
                  <span
                    className={`inline-block rounded-full px-4 py-1 text-sm font-semibold tracking-wide uppercase
                    ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }
                    `}
                  >
                    {item.title}
                  </span>

                  {/* Price */}
                  <h4
                    className={`mt-6 text-5xl font-extrabold ${
                      isSelected ? 'text-blue-700 dark:text-blue-600' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    ${item.price}
                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400"> / month</span>
                  </h4>

                  {/* Description */}
                  <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Max employees */}
                  <div className="mt-8 flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-md font-medium">Max {item.maxEmployee} employees</span>
                  </div>
                </div>

                {/* Payment form or button */}
                {isSelected ? (
                  <div className="mt-10">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm price={price} />
                    </Elements>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="mt-10 w-full rounded-full bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
                    onClick={() => handleChoosePlan(item)}
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Payment;
