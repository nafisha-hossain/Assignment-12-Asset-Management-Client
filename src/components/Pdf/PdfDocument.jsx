// src/components/PdfDocument.js
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {},
  footer: {
    textAlign: 'center',
  },
  section: {
    alignContent: 'flex-start',
  },
  companyInfo: {
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateFooter: {
    fontStyle: 'italic',
  },
});

// Main Component
const PdfDocument = ({ pdfData = {}, assetInfo = {}, companyInfo = {} }) => {
  const {
    company_name,
    name: hrName,
    email: hrEmail,
    employee_count,
  } = companyInfo;

  const {
    product_name,
    product_type,
    requested_date,
    approve_date,
  } = pdfData;

  const { product_quantity, availability } = assetInfo;

  const requestDate = format(requested_date, 'EEEE, MMMM do, yyyy');
  const approveDate = format(approve_date, 'EEEE, MMMM do, yyyy');
  const currentDate = format(new Date(), 'MMM do, yyyy h:mm:ss a');

  // Reusable line block
  const InfoLine = ({ label, value }) => (
    <Text style={styles.companyInfo}>
      <Text style={styles.heading}>{label}:</Text> {value}
    </Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <InfoLine label="Company Name" value={company_name} />
          <InfoLine label="HR Name" value={hrName} />
          <InfoLine label="HR Email" value={hrEmail} />
          <InfoLine label="Total Employee" value={employee_count} />
        </View>

        {/* Section */}
        <View style={styles.section}>
          <InfoLine label="Product Name" value={product_name} />
          <InfoLine label="Product Type" value={product_type} />
          <InfoLine label="Product Quantity" value={product_quantity} />
          <InfoLine label="Availability" value={availability} />
          <InfoLine label="Request Date" value={requestDate} />
          <InfoLine label="Approve Date" value={approveDate} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.dateFooter}>{currentDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

// PropTypes
PdfDocument.propTypes = {
  pdfData: PropTypes.object,
  companyInfo: PropTypes.object,
  assetInfo: PropTypes.object,
};

export default PdfDocument;
