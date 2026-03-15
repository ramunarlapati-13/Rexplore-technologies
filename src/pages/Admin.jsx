import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const Admin = () => {
    const { user, isAdmin, logout } = useFirebase();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('testimonials');
    const [testimonials, setTestimonials] = useState([]);
    const [projects, setProjects] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }

        // Testimonials listener
        const tUnsub = onSnapshot(collection(db, "testimonials"), (snap) => {
            const list = [];
            snap.forEach(d => list.push({ id: d.id, ...d.data() }));
            setTestimonials(list);
        });

        // Projects listener
        const pUnsub = onSnapshot(collection(db, "demo_requests"), (snap) => {
            const list = [];
            const refs = {};
            snap.forEach(d => {
                const data = d.data();
                list.push({ id: d.id, ...data });
                if (data.referral && data.referral !== 'none') {
                    refs[data.referral] = (refs[data.referral] || 0) + 1;
                }
            });
            setProjects(list);
            setLeaderboard(Object.entries(refs).sort((a, b) => b[1] - a[1]));
        });

        return () => {
            tUnsub();
            pUnsub();
        };
    }, [isAdmin, navigate]);

    const handleUpdateStatus = async (col, id, status) => {
        try {
            await updateDoc(doc(db, col, id), { status });
            alert("Status updated!");
        } catch (err) {
            alert("Error updating: " + err.message);
        }
    };

    const handleDelete = async (col, id) => {
        if (!window.confirm("Delete this record?")) return;
        try {
            await deleteDoc(doc(db, col, id));
        } catch (err) {
            alert("Error deleting: " + err.message);
        }
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(projects.map(p => ({
            'ID': p.id,
            'Name': p.name,
            'Email': p.email,
            'Phone': p.phone,
            'Budget': p.budget,
            'Status': p.status,
            'Service': p.interest,
            'Subcategory': p.interestSubcategory || '',
            'Timeline': p.timeline,
            'Requirements': p.requirements,
            'Date': p.timestamp?.toDate().toLocaleString()
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
        XLSX.writeFile(workbook, `Rexplore_Projects_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    if (!isAdmin) return null;

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-actions">
                        <button onClick={handleExport} className="btn btn-primary" style={{ background: '#10b981' }}>Export Excel</button>
                        <button onClick={logout} className="btn-outline-danger">
                            <i className="fa-solid fa-right-from-bracket"></i> Logout
                        </button>
                    </div>
                </div>

                <div className="tabs">
                    <button className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`} onClick={() => setActiveTab('testimonials')}>
                        <i className="fa-solid fa-comments"></i> Testimonials
                    </button>
                    <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                        <i className="fa-solid fa-clipboard-list"></i> Demo Requests
                    </button>
                    <button className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>
                        <i className="fa-solid fa-trophy"></i> Leaderboard
                    </button>
                </div>

                <div className="admin-content">
                    {activeTab === 'testimonials' && (
                        <div className="data-list active">
                            {testimonials.map(t => (
                                <div key={t.id} className="admin-item">
                                    <div className="item-main">
                                        <div className="item-head">
                                            <div className="title-section">
                                                <h4>{t.name}</h4>
                                                <span className="id-badge">#{t.id.slice(-6).toUpperCase()}</span>
                                            </div>
                                            <span className={`status-indicator status-${t.status}`}>{t.status}</span>
                                        </div>
                                        <div className="item-body">
                                            <div className="rating-display">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`fa-star ${i < Number(t.rating) ? 'fa-solid' : 'fa-regular'}`} style={{ color: i < Number(t.rating) ? '#fbbf24' : 'rgba(255,255,255,0.1)' }}></i>
                                                ))}
                                            </div>
                                            <p className="testimonial-text">"{t.text}"</p>
                                            <div className="item-meta">
                                                <i className="fa-regular fa-clock"></i>
                                                <span>{formatDate(t.timestamp)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-ctrl">
                                        <div className="ctrl-group">
                                            <select value={t.status} onChange={(e) => handleUpdateStatus('testimonials', t.id, e.target.value)}>
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="hidden">Hidden</option>
                                            </select>
                                            <button onClick={() => handleDelete('testimonials', t.id)} className="btn-action-danger" title="Delete record"><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="data-list active">
                            {projects.map(p => (
                                <div key={p.id} className="admin-item">
                                    <div className="item-main">
                                        <div className="item-head">
                                            <div className="title-section">
                                                <h4>{p.name}</h4>
                                                <span className="id-badge">#{p.id.slice(-6).toUpperCase()}</span>
                                            </div>
                                            <div className="service-pill">
                                                <i className="fa-solid fa-microchip"></i>
                                                <span>{p.interest}{p.interestSubcategory ? ` — ${p.interestSubcategory}` : ''}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="item-body">
                                            <div className="data-grid">
                                                <div className="data-cell">
                                                    <label><i className="fa-regular fa-envelope"></i> Email</label>
                                                    <span>{p.email}</span>
                                                </div>
                                                <div className="data-cell">
                                                    <label><i className="fa-solid fa-phone"></i> Phone</label>
                                                    <span>{p.phone || 'N/A'}</span>
                                                </div>
                                                <div className="data-cell">
                                                    <label><i className="fa-solid fa-chart-line"></i> Pipeline</label>
                                                    <span className={`status-indicator status-${p.status}`}>{p.status}</span>
                                                </div>
                                                <div className="data-cell">
                                                    <label><i className="fa-solid fa-wallet"></i> Budget</label>
                                                    <span>{p.budget || 'N/A'}</span>
                                                </div>
                                            </div>
                                            
                                            {p.requirements && (
                                                <div className="requirements-summary">
                                                    <label>Major Requirements:</label>
                                                    <p>{p.requirements}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="item-ctrl">
                                        <div className="ctrl-group">
                                            <select value={p.status} onChange={(e) => handleUpdateStatus('demo_requests', p.id, e.target.value)}>
                                                <option value="received">Received</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="in-progress">In-Progress</option>
                                                <option value="finalizing">Finalizing</option>
                                                <option value="live">Live</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                            <button onClick={() => handleDelete('demo_requests', p.id)} className="btn-action-danger" title="Delete request"><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'leaderboard' && (
                        <div className="data-list active">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User Email</th>
                                        <th>Total Referrals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map(([email, count]) => (
                                        <tr key={email}>
                                            <td>{email}</td>
                                            <td>{count} projects</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
