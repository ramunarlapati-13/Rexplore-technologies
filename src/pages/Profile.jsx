import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, isAdmin } = useFirebase();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const q = query(collection(db, "demo_requests"), where("email", "==", user.email));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
            setRequests(items);
        });

        return unsubscribe;
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="profile-page">
            <section className="profile-hero">
                <div className="container">
                    <div className="profile-header">
                        <div className="profile-info">
                            <img src={user.photoURL} alt={user.displayName} className="profile-avatar" />
                            <div>
                                <h1>Welcome, {user.displayName}</h1>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="profile-actions">
                            {isAdmin && (
                                <Link to="/admin" className="btn-outline-primary">
                                    <i className="fa-solid fa-gauge-high"></i> Admin
                                </Link>
                            )}
                            <button onClick={logout} className="btn-outline-danger">
                                <i className="fa-solid fa-right-from-bracket"></i> Logout
                            </button>
                        </div>
                    </div>

                    <div className="requests-section">
                        <h2>Your Project Briefs</h2>
                        {requests.length === 0 ? (
                            <div className="no-data-card">
                                <div className="no-data-icon">
                                    <i className="fa-solid fa-folder-plus"></i>
                                </div>
                                <h3>No projects yet</h3>
                                <p>Start your journey by booking a project brief today.</p>
                                <Link to="/book-a-demo" className="btn-glow-primary">
                                    <i className="fa-solid fa-plus"></i> Start a Project
                                </Link>
                            </div>
                        ) : (
                            <div className="requests-grid">
                                {requests.map(req => (
                                    <div key={req.id} className="request-card">
                                        <div className="card-head">
                                            <div className="title-section">
                                                <i className="fa-solid fa-folder-open"></i>
                                                <h3>{req.interest}</h3>
                                            </div>
                                            <span className={`status-indicator status-${req.status}`}>{req.status}</span>
                                        </div>
                                        
                                        <div className="card-body">
                                            <div className="card-meta-grid">
                                                <div className="meta-item">
                                                    <label><i className="fa-solid fa-fingerprint"></i> Tracking ID</label>
                                                    <code>{req.id.slice(-8).toUpperCase()}</code>
                                                </div>
                                                <div className="meta-item">
                                                    <label><i className="fa-regular fa-calendar"></i> Date</label>
                                                    <span>{formatDate(req.timestamp)}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <label><i className="fa-solid fa-hourglass-half"></i> Timeline</label>
                                                    <span>{req.timeline}</span>
                                                </div>
                                                {req.interestSubcategory && (
                                                    <div className="meta-item">
                                                        <label><i className="fa-solid fa-tags"></i> Segment</label>
                                                        <span>{req.interestSubcategory}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
