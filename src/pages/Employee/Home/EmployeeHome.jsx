import MonthlyRequest from './MonthlyRequest';
import MyPendingRequest from './MyPendingRequest';
import NoticeSection from './NoticeSection';

const EmployeeHome = () => {
  return (
    <div>
      <div>
        <NoticeSection />
      </div>
      <div className="mt-24">
        <MyPendingRequest />
      </div>
      <div className="my-24">
        <MonthlyRequest />
      </div>
      {/* <Modal /> */}
    </div>
  );
};

export default EmployeeHome;
