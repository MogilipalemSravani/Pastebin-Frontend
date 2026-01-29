import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { healthCheck } from '../services/api';

const Home = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const result = await healthCheck();
      setHealth(result.ok);
    } catch (error) {
      setHealth(false);
      toast.error('Backend service is unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to PasteBin Clone</h1>
        <p className="lead">
          A simple and secure way to share text snippets with optional expiration and view limits.
        </p>
        <div className="health-status">
          <span className={`status-indicator ${health ? 'online' : 'offline'}`}></span>
          <span className="status-text">
            {loading ? 'Checking backend...' : health ? 'Backend online' : 'Backend offline'}
          </span>
        </div>
        <div className="mt-4">
          <Link to="/create" className="btn btn-primary btn-lg">
            Create New Paste
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>🔒 Secure & Private</h3>
          <p>Your pastes are only accessible via unique URLs</p>
        </div>
        <div className="feature">
          <h3>⏱️ Expiration</h3>
          <p>Set automatic deletion after specified time</p>
        </div>
        <div className="feature">
          <h3>👁️ View Limits</h3>
          <p>Control how many times your paste can be viewed</p>
        </div>
      </div>

      <div className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>Click "Create New Paste"</li>
          <li>Enter your text content</li>
          <li>Set optional constraints (expiration, view limits)</li>
          <li>Share the generated URL</li>
          <li>Access will be automatically revoked when constraints are met</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;