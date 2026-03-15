import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const TrackingModal = ({ isOpen, onClose }) => {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setError(false);
    setResult(null);

    try {
      const docRef = doc(db, "demo_requests", trackingId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setResult(docSnap.data());
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const steps = [
    { id: 'received', label: 'Received', icon: '1' },
    { id: 'reviewed', label: 'Reviewed', icon: '2' },
    { id: 'in-progress', label: 'In-Progress', icon: '3' },
    { id: 'finalizing', label: 'Finalizing', icon: '4' },
    { id: 'live', label: 'Live', icon: '🚀' }
  ];

  const getStepStatus = (stepId) => {
    if (!result) return '';
    const statusMap = {
      'received': 0,
      'reviewed': 1,
      'in-progress': 2,
      'finalizing': 3,
      'live': 4
    };
    const currentStatus = result.status || 'received';
    const currentIndex = statusMap[currentStatus] ?? 0;
    const stepIndex = statusMap[stepId];

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return '';
  };

  const getProgressWidth = () => {
    if (!result) return '0%';
    const statusMap = {
      'received': '0%',
      'reviewed': '25%',
      'in-progress': '50%',
      'finalizing': '75%',
      'live': '100%'
    };
    return statusMap[result.status] || '0%';
  };

  return (
    <div className="success-modal active">
      <div className="modal-content tracking-modal-box">
        <div className="modal-header">
          <h3>Track Your Request</h3>
          <p>Enter your internal tracking ID to see the current status of your project or professional service request.</p>
        </div>

        <div className="tracking-input-group">
          <input 
            type="text" 
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="EX: 7XzR... (Tracking ID)" 
          />
          <button onClick={handleSearch} className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : <><i className="fa-solid fa-magnifying-glass"></i> Search</>}
          </button>
        </div>

        {result && (
          <div className="tracking-result" style={{ display: 'block' }}>
            <div className="status-roadmap">
              <div className="roadmap-progress-bar" style={{ width: getProgressWidth() }}></div>
              {steps.map(step => (
                <div key={step.id} className={`roadmap-step ${getStepStatus(step.id)}`}>
                  <div className="step-dot">{step.icon}</div>
                  <div className="step-label">{step.label}</div>
                </div>
              ))}
            </div>

            <div className="track-details">
              <div className="track-info-row">
                <span className="label">Request Name</span>
                <span className="value">{result.name}</span>
              </div>
              <div className="track-info-row">
                <span className="label">Service</span>
                <span className="value">
                  {result.interest}
                  {result.interestSubcategory ? ` - ${result.interestSubcategory}` : ''}
                </span>
              </div>
              <div className="track-info-row">
                <span className="label">Timeline</span>
                <span className="value">{result.timeline}</span>
              </div>
              
              {result.status === 'live' && (
                <p className="live-status-alert">
                  <i className="fa-solid fa-circle-check"></i> Your request is now live!
                </p>
              )}
              
              <div className="track-footer">
                <span>Last Updated: {result.timestamp?.toDate().toLocaleString() || 'Recent'}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="track-error-msg" style={{ display: 'flex' }}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <div>
              <strong>Invalid ID</strong>
              <span>Please re-enter correctly (IDs are case-sensitive).</span>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-secondary btn-full" onClick={onClose}>Close Tracking</button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
