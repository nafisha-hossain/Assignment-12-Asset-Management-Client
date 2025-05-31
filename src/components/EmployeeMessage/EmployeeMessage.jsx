const EmployeeMessage = () => (
  <section>
    <div className="container mx-auto flex items-center px-6 py-12">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <div className="rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500 dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Contact with your HR!</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">If you're having trouble joining the company, please reach out to your HR department for assistance and further guidance.</p>
      </div>
    </div>
  </section>
);

export default EmployeeMessage;
