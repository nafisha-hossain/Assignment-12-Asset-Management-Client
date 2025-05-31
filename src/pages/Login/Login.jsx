import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import GithubButton from '../../components/SocialBtn/GithubButton';
import GoogleButton from '../../components/SocialBtn/GoogleButton';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';

const Login = () => {
  const { loginUser, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const form = location?.state || '/';

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await loginUser(email, password);

      successAlert('Login successful!');
      navigate(form);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();
      successAlert('Login successful');

      const employeeData = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'employee',
        isJoin: false,
      };

      await axiosSecure.post('/employees', employeeData);
      navigate(form);
    } catch (error) {
      errorAlert(error.message);
      console.log(error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { user } = await githubLogin();
      successAlert('Login successful');

      const employeeData = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'employee',
        isJoin: false,
      };

      await axiosSecure.post('/employees', employeeData);

      navigate(form);
    } catch (error) {
      errorAlert(error.message);
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-8">
          Welcome Back
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              placeholder="you@example.com"
              className={`w-full rounded-md border px-4 py-2 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full rounded-md border px-4 py-2 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          >
            Log In
          </button>
        </form>

        <div className="relative my-8 flex items-center justify-center">
          <span className="absolute left-0 w-1/3 border-b border-gray-300 dark:border-gray-600"></span>
          <span className="mx-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
            Or continue with
          </span>
          <span className="absolute right-0 w-1/3 border-b border-gray-300 dark:border-gray-600"></span>
        </div>

        <div className="flex flex-col gap-4">
          <GoogleButton onClick={handleGoogleLogin} />
          <GithubButton onClick={handleGithubLogin} />
        </div>
      </div>
    </section>
  );
};

export default Login;
