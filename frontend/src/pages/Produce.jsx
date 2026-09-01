import React, { useState, useEffect } from 'react';
import { produceService } from '../services/apiService';
import { Plus, Eye, Download, Search } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const Produce = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await produceService.getAllBatches();
      setBatches(response.data || []);
    } catch (error) {
      console.error('Error fetching batches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = (batch) => {
    const qrElement = document.getElementById(`qr-${batch.id}`);

    if (qrElement) {
      const canvas = qrElement.querySelector('canvas');

      if (canvas) {
        const url = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = url;
        link.download = `QR-${batch.batch_id}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const filteredBatches = batches.filter(
    (batch) =>
      batch.batch_id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      batch.product_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container">
        <p>Loading produce batches...</p>
      </div>
    );
  }

  return (
    <div className="container">

      <div
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h1 className="page-title">
            Produce Batch Management
          </h1>

          <p className="page-subtitle">
            Track and manage produce batches
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          New Batch
        </button>
      </div>

      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'white',
          padding: '10px 16px',
          borderRadius: '8px'
        }}
      >
        <Search size={18} color="#9ca3af" />

        <input
          type="text"
          placeholder="Search batches..."
          className="form-input"
          style={{
            flex: 1,
            border: 'none',
            padding: '0'
          }}
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Harvest Date</th>
              <th>Current Stage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBatches.length > 0 ? (
              filteredBatches.map((batch) => (
                <tr key={batch.id}>
                  <td>
                    <strong>
                      {batch.batch_id}
                    </strong>
                  </td>

                  <td>
                    {batch.product_name}
                  </td>

                  <td>
                    {batch.quantity} {batch.unit}
                  </td>

                  <td>
                    {batch.harvest_date
                      ? new Date(
                          batch.harvest_date
                        ).toLocaleDateString()
                      : '-'}
                  </td>

                  <td>
                    {batch.current_stage}
                  </td>

                  <td>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor:
                          batch.status === 'Completed'
                            ? '#dcfce7'
                            : '#dbeafe',
                        color:
                          batch.status === 'Completed'
                            ? '#059669'
                            : '#0369a1'
                      }}
                    >
                      {batch.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-secondary btn-small"
                      style={{
                        marginRight: '8px'
                      }}
                      onClick={() => {
                        setSelectedBatch(batch);
                        setShowQR(true);
                      }}
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => {
                        setSelectedBatch(batch);
                        setShowQR(true);
                      }}
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: 'center',
                    padding: '30px'
                  }}
                >
                  No produce batches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showQR && selectedBatch && (
        <div className="modal open">

          <div
            className="modal-content"
            style={{
              padding: '30px'
            }}
          >

            <h2
              style={{
                marginBottom: '20px'
              }}
            >
              QR Code - {selectedBatch.batch_id}
            </h2>

            <div
              id={`qr-${selectedBatch.id}`}
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                padding: '20px',
                background: 'white'
              }}
            >

              <QRCodeCanvas
                value={`http://localhost:5173/trace/${selectedBatch.batch_id}`}
                size={256}
                level="H"
                includeMargin={true}
              />

            </div>

            <p
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#6b7280'
              }}
            >
              Scan this QR code to view complete
              traceability
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                handleDownloadQR(selectedBatch)
              }
              style={{
                width: '100%',
                marginBottom: '10px'
              }}
            >
              <Download size={16} />
              Download QR Code
            </button>

            <button
              className="btn btn-secondary"
              style={{
                width: '100%',
                backgroundColor: '#9ca3af'
              }}
              onClick={() => {
                setShowQR(false);
                setSelectedBatch(null);
              }}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Produce;