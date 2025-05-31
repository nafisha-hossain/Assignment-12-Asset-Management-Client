const AssetRequestModal = ({
  showModal,
  isDirty,
  register,
  setShowModal,
  handleSubmit,
  handleRequest,
}) => {
  if (!showModal) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-full max-w-md">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-gray-800">
            <form
              onSubmit={handleSubmit(handleRequest)}
              noValidate
              className="relative mt-6 flex-auto px-6"
            >
              {/* Input field */}
              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Additional Notes
                </label>
                <input
                  {...register('notes', { required: true })}
                  id="notes"
                  type="text"
                  placeholder="Add additional notes"
                  className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between py-6">
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={`rounded px-5 py-1.5 font-medium text-white transition-colors duration-200 ${
                    isDirty
                      ? 'bg-primary hover:bg-blue-700'
                      : 'cursor-not-allowed bg-gray-600 hover:bg-gray-600'
                  }`}
                >
                  Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded bg-rose-500 px-5 py-1.5 font-medium text-white transition-colors duration-200 hover:bg-rose-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetRequestModal;
