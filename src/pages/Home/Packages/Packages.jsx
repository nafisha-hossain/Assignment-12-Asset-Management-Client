const Packages = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          Our Pricing Plans
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Package Card */}
          <div className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white px-8 py-8 shadow-lg transition duration-300 hover:shadow-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Base
              </p>
              <h4 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                $5{' '}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  / Price
                </span>
              </h4>
              <p className="mt-5 text-gray-600 dark:text-gray-300">
                Just Starting Out? This Plan&apos;s Got Your Back.
              </p>
              <div className="mt-8 flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Maximum 5 employees
                </span>
              </div>
            </div>
            <button className="mt-10 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-500">
              Buy
            </button>
          </div>

          {/* Package Card */}
          <div className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white px-8 py-8 shadow-lg transition duration-300 hover:shadow-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Regular
              </p>
              <h4 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                $8{' '}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  / Price
                </span>
              </h4>
              <p className="mt-5 text-gray-600 dark:text-gray-300">
                Growing Team? This Plan Scales with You.
              </p>
              <div className="mt-8 flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Maximum 10 employees
                </span>
              </div>
            </div>
            <button className="mt-10 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-500">
              Buy
            </button>
          </div>

          {/* Package Card */}
          <div className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white px-8 py-8 shadow-lg transition duration-300 hover:shadow-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Premium
              </p>
              <h4 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                $15{' '}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  / Price
                </span>
              </h4>
              <p className="mt-5 text-gray-600 dark:text-gray-300">
                Take Website Asset Management to the Next Level.
              </p>
              <div className="mt-8 flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Maximum 20 employees
                </span>
              </div>
            </div>
            <button className="mt-10 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-500">
              Buy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
