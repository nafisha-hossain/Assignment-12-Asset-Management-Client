import BestPractice from './BestPractice';
import LimitedStockItem from './LimitedStockItem';
import PendingRequests from './PendingRequests';
import PieChartSection from './PieChartSection';
import RecognitionWall from './RecognationWall';
import TopRequestedItem from './TopRequestedItem';
const HRHome = () => {
  return (
    <div className="space-y-24">
      <BestPractice />
      <PendingRequests />
      <TopRequestedItem />
      <LimitedStockItem />
      <PieChartSection />
      <div className="pb-24">
        <RecognitionWall />
      </div>
    </div>
  );
};

export default HRHome;
