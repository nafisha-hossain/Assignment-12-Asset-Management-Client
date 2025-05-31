import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-335px)] px-4 lg:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
