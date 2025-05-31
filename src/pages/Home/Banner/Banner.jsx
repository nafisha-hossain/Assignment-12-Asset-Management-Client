// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Slider from './Slider';

const Banner = () => {
  return (
    <div className="relative w-full max-h-[600px] overflow-hidden rounded-lg shadow-xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass:
            'swiper-pagination-bullet bg-white opacity-70 hover:opacity-100 transition-opacity',
          bulletActiveClass: 'swiper-pagination-bullet-active bg-primary',
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slider
            img={'https://i.ibb.co/3cjkCbp/pexels-fauxels-3184339.jpg'}
            btnText={'Join As Employee'}
            address={'/employee'}
            heading={'Streamline Your Day with AssetAura'}
            description={
              'Effortlessly track assets, access maintenance schedules, and get real-time updates all in one place.'
            }
            overlayClass="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
            contentWrapperClass="relative z-10 p-8 max-w-3xl text-white"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            img={'https://i.ibb.co/gJ3wgdC/creative-people-working-office.jpg'}
            btnText={'Join As HR Manager'}
            address={'/hr-manager'}
            heading={'Gain Visibility and Insight with AssetAura'}
            description={`Make informed decisions about resource allocation, optimize asset utilization, and ensure regulatory compliance.`}
            overlayClass="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent"
            contentWrapperClass="relative z-10 p-8 max-w-3xl text-white"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
