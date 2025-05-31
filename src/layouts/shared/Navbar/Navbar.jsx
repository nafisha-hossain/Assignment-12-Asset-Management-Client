import { useEffect, useRef, useState } from 'react';
import { FaBars, FaMoon } from 'react-icons/fa';
import { MdWbSunny } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import CommonNavItem from '../../../components/NavItem/CommonNavItem';
import EmployeeNavItem from '../../../components/NavItem/EmployeeNavItem/EmployeeNavItem';
import HrNavItem from '../../../components/NavItem/HrNavItem/HrNavItem';
import useAuth from '../../../hooks/useAuth';
import useCompanyInfo from '../../../hooks/useCompanyInfo';
import useRoll from '../../../hooks/useRoll';
import logo1 from '../../../../public/logo1.jpg';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { getThemeFromLs, setThemeToLs } from '../../../utils/theme';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [companyData] = useCompanyInfo();
  const [loggedInUser] = useLoggedInUser();
  const [role] = useRoll();

  const [theme, setTheme] = useState(getThemeFromLs() || 'light');

  // Toggle mobile menu visibility by adding/removing 'hidden' class
  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.toggle('hidden', !isMenuOpen);
    }
  }, [isMenuOpen]);

  // Apply theme class to html element and sync localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('class', theme);
    setThemeToLs(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // Determine logo source based on role and data availability
  const logoSrc =
    role === 'HR'
      ? loggedInUser?.company_logo || logo1
      : companyData?.hr_info?.company_logo || logo1;

  return (
    <nav className="fixed inset-x-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logoSrc}
            alt="Company Logo"
            className={`size-14 rounded-full border-4 object-cover ${
              role === 'HR'
                ? 'border-blue-800 dark:border-blue-100'
                : 'border-gray-800 dark:border-blue-500'
            }`}
          />
          {/* Optional company name can be added here */}
        </Link>

        <div className="flex items-center space-x-3 lg:order-2 rtl:space-x-reverse">
          <button
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="mr-4 text-gray-800 dark:text-gray-300"
          >
            {theme === 'light' ? (
              <FaMoon className="text-3xl" />
            ) : (
              <MdWbSunny className="text-3xl" />
            )}
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              type="button"
              className="rounded bg-blue-700 px-5 py-2.5 text-sm font-medium capitalize tracking-wide text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="rounded bg-blue-700 px-5 py-2.5 text-sm font-medium capitalize tracking-wide text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </Link>
          )}

          <button
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col items-center space-y-2 p-4 font-medium dark:border-gray-700 dark:bg-gray-900 lg:mt-0 lg:flex-row lg:space-x-6 lg:space-y-0 lg:border-0 lg:p-0 lg:dark:bg-gray-900 rtl:space-x-reverse">
            {!role && <CommonNavItem />}
            {role === 'employee' && <EmployeeNavItem />}
            {role === 'HR' && <HrNavItem />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
