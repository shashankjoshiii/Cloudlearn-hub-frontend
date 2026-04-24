import React, { useState } from 'react';
import './Upload.css';

const Upload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = () => {
    if (!selectedFile) return alert("Please select a file first!");

    const newFileObj = {
      id: Date.now(),
      name: selectedFile.name,
      type: selectedFile.type,
      size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB'
    };

    onUploadSuccess(newFileObj); // Sends to App.js
  };

  return (
    <div className="center-content">
      <div className="upload-card">
        <div className="upload-icon">☁️</div>
        <h2>Upload Study Material</h2>
        <p>PDFs or Images only (max 10MB)</p>
        
        <input 
          type="file" 
          id="file-upload" 
          hidden 
          accept="application/pdf, image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        
        <label htmlFor="file-upload" className="select-area">
          {selectedFile ? `Selected: ${selectedFile.name}` : "Click to Browse Files"}
        </label>

        {selectedFile && (
          <button className="upload-btn" onClick={handleUpload}>
            Push to Cloud Storage
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;