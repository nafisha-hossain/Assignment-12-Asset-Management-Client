import { Link } from 'react-router-dom';

const Slider = ({ img, address, btnText, heading, description }) => {
  return (
    <div
      className="relative h-[32rem] w-full overflow-hidden rounded-lg shadow-xl bg-cover bg-center transition-transform duration-500 hover:scale-[1.03]"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="relative flex h-full w-full items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-lg lg:text-[40px]">
            {heading}
          </h1>
          <p className="mx-auto max-w-xl text-lg font-medium text-gray-200 drop-shadow-sm">
            {description}
          </p>
          <Link to={address}>
            <button
              type="button"
              className="mt-8 rounded-lg bg-blue-600 px-12 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              {btnText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
