import { PDFViewer } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PdfDocument from './PdfDocument';

const PrintAssetPdf = ({ pdfData, assetInfo, showModal, setShowModal }) => {
  const axiosSecure = useAxiosSecure();
  const email = pdfData?.provider_info?.email;

  // Fetch company info based on provider email
  const { data: companyInfo = {} } = useQuery({
    queryKey: ['company-info-pdf', email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee/${email}`);
      return data;
    },
    enabled: !!email, // prevent fetching if email is undefined
  });

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
        <div className="relative w-full max-w-3xl mx-auto my-6">
          <div className="relative flex h-[90vh] w-full flex-col rounded-lg bg-white shadow-lg outline-none">
            {/* Modal Header */}
            <div className="flex items-start justify-end p-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-3xl text-red-500 outline-none focus:outline-none"
              >
                <IoIosClose />
              </button>
            </div>

            {/* Modal Body */}
            <div className="relative flex-auto pb-9">
              <PDFViewer width="100%" height="100%">
                <PdfDocument
                  assetInfo={assetInfo}
                  companyInfo={companyInfo}
                  pdfData={pdfData}
                />
              </PDFViewer>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-60" />
    </>
  );
};

PrintAssetPdf.propTypes = {
  pdfData: PropTypes.object.isRequired,
  assetInfo: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default PrintAssetPdf;
