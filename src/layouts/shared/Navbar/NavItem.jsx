import { NavLink } from 'react-router-dom';

const NavItem = ({ label, address }) => {
  return (
    <li>
      <NavLink
        to={address}
        className={({ isActive }) =>
          isActive
            ? 'block w-max rounded bg-primary px-3 py-2 text-center text-sm text-white transition-colors duration-300 dark:border-blue-700 dark:hover:text-white lg:bg-transparent lg:p-0 lg:text-primary lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-blue-500'
            : 'block w-max rounded px-3 py-2 text-center text-sm text-gray-900 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-blue-500'
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
