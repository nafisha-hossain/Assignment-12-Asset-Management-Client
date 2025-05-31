import { IoMdClose } from 'react-icons/io';
import useAlert from '../../../hooks/useAlert';

export default function Modal() {
  const [showModal, setShowModal] = useAlert();

  return (
    <>
      <button
        type="button"
        className="mb-1 mr-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        onClick={() => setShowModal(true)}
      >
        Open small modal
      </button>

      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-full max-w-sm">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="relative flex-auto py-3">
                  <p className="text-blueGray-500 my-4 text-center text-lg leading-relaxed">
                    Please contact with your HR
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute right-2 top-2"
                    aria-label="Close modal"
                  >
                    <IoMdClose className="text-2xl transition-colors duration-200 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
}
