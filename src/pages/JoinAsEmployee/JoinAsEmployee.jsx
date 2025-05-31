import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import GithubButton from '../../components/SocialBtn/GithubButton';
import GoogleButton from '../../components/SocialBtn/GoogleButton';
import Title from '../../components/Title/Title';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';
import { imageUpload } from '../../utils/api';
import './style.css';

const JoinAsEmployee = () => {
  const { createUser, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, password, photo } = data;

    try {
      const image_url = await imageUpload(photo[0]);
      const employeeData = {
        name,
        email,
        image: image_url,
        role: 'employee',
        date_of_birth: startDate,
        isJoin: false,
      };

      await axiosSecure.post('/employees', employeeData);
      const { user } = await createUser(email, password);
      await updateProfile(user, { displayName: name, photoURL: image_url });
      setLoading(false);
      successAlert('Sign up successful');
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error(error);
      errorAlert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();
      successAlert('Sign in successful');

      const employeeData = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'employee',
        isJoin: false,
      };

      await axiosSecure.post('/employees', employeeData);
      navigate('/');
    } catch (error) {
      errorAlert(error.message);
      console.error(error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { user } = await githubLogin();
      successAlert('Sign in successful');

      const employeeData = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'employee',
        isJoin: false,
      };

      await axiosSecure.post('/employees', employeeData);
      navigate('/');
    } catch (error) {
      errorAlert(error.message);
      console.error(error);
    }
  };

  return (
    <section className="pb-24 pt-40 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <Title title="AssetAura | Join as Employee" />

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-md shadow-lg p-8 sm:p-12">
        {/* Social Login Buttons */}
        <div className="flex flex-col space-y-4 mb-8">
          <GoogleButton onClick={handleGoogleLogin} />
          <GithubButton onClick={handleGithubLogin} />
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <hr className="w-1/4 border-gray-300 dark:border-gray-600" />
          <p className="text-sm uppercase text-gray-500 dark:text-gray-400 select-none">
            or sign up with email
          </p>
          <hr className="w-1/4 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full rounded-md border border-blue-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-blue-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Profile Photo
            </label>
            <input
              {...register('photo', { required: true })}
              type="file"
              id="photo"
              accept="image/*"
              className="w-full rounded-md border border-gray-300 text-sm file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:file:bg-blue-700 dark:file:hover:bg-blue-800"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-blue-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="date-of-birth"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <DatePicker
              id="date-of-birth"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full rounded-md border border-blue-300 bg-gray-50 p-3 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
              dateFormat="MMMM d, yyyy"
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3 mt-4 rounded-md text-white text-lg font-semibold transition-colors duration-300 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 flex justify-center items-center gap-2`}
          >
            {loading ? <ImSpinner9 className="animate-spin text-xl" /> : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinAsEmployee;
