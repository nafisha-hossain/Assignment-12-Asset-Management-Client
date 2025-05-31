import Payment from '../Payment/Payment';

const CheckIcon = () => (
  <svg
    className="h-4 w-4 flex-shrink-0 text-blue-700 dark:text-blue-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

const PaymentModal = ({ showModal, setShowModal, managerData }) => {
  if (!showModal) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
        <div className="relative mx-auto my-6 w-full max-w-md">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg dark:bg-gray-800">
            {/* Body */}
            <div className="relative flex-auto p-6">
              <div className="bg-white p-4 sm:p-8 dark:bg-gray-800">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  Basic Plan
                </h5>

                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">49</span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /Price
                  </span>
                </div>

                <ul role="list" className="my-7 space-y-5">
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ms-3 text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      2 team members
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    <span className="ms-3 text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      20GB Cloud storage
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                >
                  Pay
                </button>
              </div>
            </div>

            {/* Payment Component */}
            <div className="pb-4">
              <Payment managerData={managerData} setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
