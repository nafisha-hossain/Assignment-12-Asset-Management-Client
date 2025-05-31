const TableHeading = ({ heading }) => {
  return (
    <h1 className="mb-6 text-center text-[clamp(20px,4vw,40px)] font-bold dark:text-white">
      {heading}
    </h1>
  );
};

export default TableHeading;
