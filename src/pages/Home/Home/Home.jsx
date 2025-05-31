import { FiCloudLightning } from 'react-icons/fi';
import Title from '../../../components/Title/Title';
import usePayment from '../../../hooks/usePayment';
import useRoll from '../../../hooks/useRoll';
import EmployeeHome from '../../Employee/Home/EmployeeHome';
import HRHome from '../../HR/HRHome/HRHome';
import AboutSection from '../AboutSection/AboutSection';
import Banner from '../Banner/Banner'
import Packages from '../Packages/Packages';

const Home = () => {
  const [role] = useRoll();

  usePayment();

  console.log(role)

  return (
    <>
      <div className="container pt-40">
        <Title title={'Asset Management | Home'} />
        {/* for without login user */}
        {role === undefined && (
          <>
            <div>
              <Banner />
            </div>
            <div className="mt-32">
              <AboutSection />
            </div>
            <div className="my-32">
              <Packages />
            </div>
          </>
        )}
        {/* For employee */}
        {role === 'employee' && <EmployeeHome />}

        {/* for hr manager */}
        {role === 'HR' && <HRHome />}
      </div>
    </>
  );
};

export default Home;
