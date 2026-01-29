import React from 'react';
import { Link } from 'react-router-dom';

const PasteCard = ({ paste }) => {
  return (
    <div className="paste-card">
      <div className="paste-content">
        <pre>{paste.content}</pre>
      </div>
      <div className="paste-meta">
        {paste.expires_at && (
          <span className="meta-item">
            Expires: {new Date(paste.expires_at).toLocaleString()}
          </span>
        )}
        {paste.remaining_views !== null && (
          <span className="meta-item">
            Views remaining: {paste.remaining_views}
          </span>
        )}
      </div>
      <Link to={`/p/${paste.id}`} className="btn btn-sm btn-outline-primary">
        View Details
      </Link>
    </div>
  );
};

export default PasteCard;