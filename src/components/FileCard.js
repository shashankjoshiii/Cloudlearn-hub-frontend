import React from 'react';
import './FileCard.css';

const FileCard = ({ title, date, size }) => {
  return (
    <div className="file-card">
      <div className="file-icon">📄</div>
      <div className="file-info">
        <h3>{title}</h3>
        <span>{date} • {size}</span>
      </div>
      <div className="file-actions">
        <button className="btn-view">View</button>
        <button className="btn-dl">Download</button>
      </div>
    </div>
  );
};

export default FileCard;