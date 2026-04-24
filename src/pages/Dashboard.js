import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [file, setFile] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showSyncEffect, setShowSyncEffect] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const API = "http://localhost:5000/api";

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: '' }), 4000);
    };

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${API}/notes`);
            setNotes(res.data);
        } catch (err) { console.error("Fetch Error"); }
    };

    useEffect(() => { fetchNotes(); }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/"; 
    };

    const handleUpload = async (e) => {
        if (e) e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file); // 🚀 Key must match backend upload.single('file')

        try {
            setIsSyncing(true);
            setShowSyncEffect(true);

            const res = await axios.post(`${API}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200) {
                setTimeout(() => {
                    setShowSyncEffect(false);
                    setFile(null);
                    fetchNotes();
                    showToast("Note Successfully Synchronized.");
                    setIsSyncing(false);
                }, 2500);
            }
        } catch (err) {
            console.error("Sync Error:", err);
            setShowSyncEffect(false);
            setIsSyncing(false);
            showToast("Sync Error: Check Server Console.");
        }
    };

    return (
        <div className="dashboard-root">
            {toast.show && <div className="glass-toast">{toast.message}</div>}

            {showSyncEffect && (
                <div className="sync-overlay">
                    <div className="data-stream"></div>
                    <div className="pulse-ring"></div>
                    <p className="sync-status">ENCRYPTING & SYNCING...</p>
                </div>
            )}

            <nav className="main-nav glass">
                <div className="logo-brand">Cloud<span>Learn</span> Hub</div>
                <div className="nav-profile">
                    <span className="profile-name">Shashank Joshi</span>
                    <div className="profile-container">
                        <div className="profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)}>SJ</div>
                        {showProfileMenu && (
                            <div className="profile-dropdown glass">
                                <button onClick={handleLogout} className="logout-btn-premium">Sign Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="content-wrapper">
                <header className="hero-section">
                    <h1 className="main-title">Cloud <span>Asset Manager</span></h1>
                    <p className="sub-label">Notes Sharing Platform</p>
                </header>

                <form className={`upload-box glass ${dragActive ? 'glow-active' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => { e.preventDefault(); setDragActive(false); setFile(e.dataTransfer.files[0]); }}
                    onSubmit={handleUpload}>
                    <input type="file" id="file-up" hidden onChange={(e) => setFile(e.target.files[0])} />
                    <div className="upload-info">
                        <p className="status-text">{file ? `READY: ${file.name}` : "DRAG & DROP / SELECT NOTES"}</p>
                        {!file && <label htmlFor="file-up" className="browse-trigger">Browse Files</label>}
                    </div>
                    <button type="submit" className={`sync-button ${!file ? 'disabled' : ''}`} disabled={!file || isSyncing}>
                        {isSyncing ? "SYNCING..." : "UPLOAD TO CLOUD"}
                    </button>
                </form>

                <section className="repo-section">
                    <h2 className="section-title">Active Repository</h2>
                    <div className="grid-container">
                        {notes.map((n, i) => (
                            <div key={i} className="asset-card glass">
                                <div className="asset-icon">DOC</div>
                                <div className="asset-details">
                                    <h3>{n.name.split('_').slice(1).join('_') || n.name}</h3>
                                    <span>{n.size}</span>
                                </div>
                                <a href={n.url} target="_blank" rel="noreferrer" className="view-btn">VIEW</a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;