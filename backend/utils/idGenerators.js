const generateBatchId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 9999) + 1;
  return `AGRI-${year}-${String(randomNum).padStart(4, '0')}`;
};

const generateInspectionId = () => {
  const randomNum = Math.floor(Math.random() * 999999) + 1;
  return `INSP-${String(randomNum).padStart(6, '0')}`;
};

const generateShipmentId = () => {
  const randomNum = Math.floor(Math.random() * 999999) + 1;
  return `SHIP-${String(randomNum).padStart(6, '0')}`;
};

const generateEventId = () => {
  const randomNum = Math.floor(Math.random() * 999999) + 1;
  return `EVT-${String(randomNum).padStart(6, '0')}`;
};

const generateNotificationId = () => {
  const randomNum = Math.floor(Math.random() * 999999) + 1;
  return `NOTIF-${String(randomNum).padStart(6, '0')}`;
};

// Generate QR code data for a produce batch
const generateQRCode = (batchId) => {
  return `http://localhost:5173/trace/${batchId}`;
};

export {
  generateBatchId,
  generateInspectionId,
  generateShipmentId,
  generateEventId,
  generateNotificationId,
  generateQRCode,
};