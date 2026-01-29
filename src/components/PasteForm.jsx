import React, { useState } from 'react';

const PasteForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    content: '',
    expiresInMinutes: '',
    maxViews: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (formData.expiresInMinutes && formData.expiresInMinutes < 1) {
      newErrors.expiresInMinutes = 'Must be at least 1 minute';
    }
    
    if (formData.maxViews && formData.maxViews < 1) {
      newErrors.maxViews = 'Must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        expiresInMinutes: formData.expiresInMinutes ? parseInt(formData.expiresInMinutes) : null,
        maxViews: formData.maxViews ? parseInt(formData.maxViews) : null
      };
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="paste-form">
      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          placeholder="Enter your text here..."
          className={`form-control ${errors.content ? 'is-invalid' : ''}`}
          disabled={isLoading}
        />
        {errors.content && <div className="invalid-feedback">{errors.content}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expiresInMinutes">Expires After (minutes)</label>
          <input
            type="number"
            id="expiresInMinutes"
            name="expiresInMinutes"
            value={formData.expiresInMinutes}
            onChange={handleChange}
            min="1"
            placeholder="Optional"
            className={`form-control ${errors.expiresInMinutes ? 'is-invalid' : ''}`}
            disabled={isLoading}
          />
          {errors.expiresInMinutes && (
            <div className="invalid-feedback">{errors.expiresInMinutes}</div>
          )}
          <small className="form-text text-muted">
            Leave empty for no expiration
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="maxViews">Maximum Views</label>
          <input
            type="number"
            id="maxViews"
            name="maxViews"
            value={formData.maxViews}
            onChange={handleChange}
            min="1"
            placeholder="Optional"
            className={`form-control ${errors.maxViews ? 'is-invalid' : ''}`}
            disabled={isLoading}
          />
          {errors.maxViews && (
            <div className="invalid-feedback">{errors.maxViews}</div>
          )}
          <small className="form-text text-muted">
            Leave empty for unlimited views
          </small>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-block"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Paste'}
      </button>
    </form>
  );
};

export default PasteForm;