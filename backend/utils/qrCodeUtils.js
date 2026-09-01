import QRCode from 'qrcode';

const generateQRCode = async (batchId) => {
  try {
    const qrCodeUrl = `/trace/${batchId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export { generateQRCode };
