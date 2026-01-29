import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPaste } from '../services/api';

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaste();
  }, [id]);

  const fetchPaste = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPaste(id);
      setPaste(data);

    } catch (err) {
      setError(err.message);
      toast.error('Paste not found or expired');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading paste...</p>
      </div>
    );
  }

  if (error || !paste) {
    return (
      <div className="error-container">
        <h2>Paste Unavailable</h2>
        <p>The paste you're looking for might have:</p>
        <ul>
          <li>Expired</li>
          <li>Reached its view limit</li>
          <li>Been deleted</li>
          <li>Never existed</li>
        </ul>
        <button
          onClick={() => navigate('/create')}
          className="btn btn-primary"
        >
          Create New Paste
        </button>
      </div>
    );
  }

  return (
    <div className="view-paste-page">
      <div className="paste-header">
        <h1>Paste Content</h1>

        <div className="paste-meta">
          <div><strong>Created:</strong> {formatDate(paste.createdAt)}</div>

          {paste.expiresAt && (
            <div><strong>Expires:</strong> {formatDate(paste.expiresAt)}</div>
          )}

          {paste.maxViews !== null && (
            <div><strong>Views Remaining:</strong> {paste.remainingViews}</div>
          )}
        </div>
      </div>

      <pre className="paste-content">{paste.content}</pre>

      <div className="paste-actions">
        <button
          onClick={() => navigator.clipboard.writeText(paste.content)}
          className="btn btn-outline-primary"
        >
          Copy Content
        </button>

        <button
          onClick={() => navigate('/create')}
          className="btn btn-primary"
        >
          Create New Paste
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;