import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import useAuth from '../../hooks/useAuth';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { errorAlert, successAlert } from '../../utils/alert';
import { imageUpload } from '../../utils/api';

const JoinAsHrManager = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      company_name: '',
      pricing: '',
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (hrData) => {
      const { data } = await axiosCommon.post('/employees', hrData);
      return data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        successAlert('Signup successful!');
        navigate('/payment');
      } else {
        errorAlert('Signup failed!');
      }
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password, company_name, pricing, profile_image, photo } = data;

      if (!profile_image[0] || !photo[0]) {
        throw new Error('Profile Image and Company Logo are required.');
      }

      const profile_url = await imageUpload(profile_image[0]);
      const logo_url = await imageUpload(photo[0]);

      const hrData = {
        name,
        email,
        company_name,
        image: profile_url,
        company_logo: logo_url,
        package_info: {
          price: pricing,
          members: pricing === 5 ? 5 : pricing === 8 ? 10 : 20,
        },
        date_of_birth: startDate,
        payment_status: 'pending',
        role: 'HR',
      };

      await createUser(email, password);
      await updateUserProfile(name, profile_url);
      await mutateAsync(hrData);
    } catch (err) {
      console.error(err);
      errorAlert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mb-24 pt-40">
      <Title title={'AssetAura | Join as HR'} />
      <div className="mx-auto max-w-2xl rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Full Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Company Name</label>
            <input
              {...register('company_name', { required: true })}
              type="text"
              placeholder="Enter your company name"
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Profile Image</label>
            <input
              {...register('profile_image', { required: true })}
              type="file"
              accept="image/*"
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Company Logo</label>
            <input
              {...register('photo', { required: true })}
              type="file"
              accept="image/*"
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Date of Birth</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Select a Package</label>
            <select
              {...register('pricing', { required: true, valueAsNumber: true })}
              defaultValue=""
              className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
            >
              <option disabled value="">Choose a package</option>
              <option value="5">5 Members for $5</option>
              <option value="8">10 Members for $8</option>
              <option value="15">20 Members for $15</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded bg-blue-600 py-2 text-white ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {loading ? <ImSpinner9 className="mx-auto animate-spin text-xl" /> : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinAsHrManager;
