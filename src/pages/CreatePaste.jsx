
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasteForm from '../components/PasteForm';
import { createPaste } from '../services/api';

const CreatePaste = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createdPaste, setCreatedPaste] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (pasteData) => {
    try {
      setIsLoading(true);
      const result = await createPaste(pasteData);

      setCreatedPaste(result);
      toast.success('Paste created successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to create paste');
      console.error('Create paste error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard!');
  };

  return (
    <div className="create-paste-page">
      <h1>Create New Paste</h1>

      {createdPaste ? (
        <div className="success-card">
          <div className="success-header">
            <h3>✅ Paste Created Successfully!</h3>
          </div>

          <div className="success-body">
            <strong>Shareable URL:</strong>

            <div className="url-container">
              <code>{createdPaste.url}</code>
              <button
                onClick={() => copyToClipboard(createdPaste.url)}
                className="btn btn-sm btn-outline-secondary"
              >
                Copy
              </button>
            </div>

            <div className="mt-3">
              <button
                onClick={() => navigate(`/p/${createdPaste.id}`)}
                className="btn btn-primary"
              >
                View Paste
              </button>

              <button
                onClick={() => setCreatedPaste(null)}
                className="btn btn-outline-primary ml-2"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      ) : (
        <PasteForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </div>
  );
};

export default CreatePaste;
