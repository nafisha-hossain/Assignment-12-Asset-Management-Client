import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
import PdfDocument from './PdfDocument';

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyles = {
  width: '80%',
  height: '80%',
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
};

const YourComponent = () => {
  const [showPdf, setShowPdf] = useState(false);

  const handlePrintClick = () => setShowPdf(true);
  const handleClosePdf = () => setShowPdf(false);

  return (
    <>
      <button onClick={handlePrintClick} aria-label="Print PDF">
        Print
      </button>

      {showPdf && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            <button
              onClick={handleClosePdf}
              style={{
                alignSelf: 'flex-end',
                marginBottom: '10px',
                backgroundColor: '#e53e3e',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              aria-label="Close PDF Viewer"
            >
              Close
            </button>

            <PDFViewer width="100%" height="100%">
              <PdfDocument />
            </PDFViewer>
          </div>
        </div>
      )}
    </>
  );
};

export default YourComponent;
