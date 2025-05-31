import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import './style.css';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { successAlert } from '../../utils/alert';

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // console.log(price);

  const [loggedInUser] = useLoggedInUser();
  

  useEffect(() => {
    getClientSecret({ price });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post('/create-payment-intent', price);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setProcessing(false);
      console.log('[error]', error);
      setError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }

    // confirm payment method
    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (paymentError) {
      console.log(paymentError);
      setProcessing(false);
      setError(paymentError.message);
      return;
    }

    // console.log(paymentIntent);
    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        ...loggedInUser,
        transactionId: paymentIntent.id,
        payment_date: new Date(),
      };
      delete paymentInfo._id;

      try {
        await axiosSecure.patch(`/employee/payment/${loggedInUser?.email}`,{price});

        const { data } = await axiosSecure.post('/payments', paymentInfo);
        // console.log(data);
        if (data.insertedId) {
          successAlert('Payment successful');
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div>
        <button
          className="w-full rounded bg-primary py-2 font-medium text-white"
          type="submit"
          disabled={!stripe}
        >
          Pay ${price}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
