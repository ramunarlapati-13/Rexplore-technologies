import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, isAdmin } = useFirebase();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

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
                            {isAdmin && <Link to="/admin" className="btn btn-primary">Admin Dashboard</Link>}
                            <button onClick={logout} className="btn btn-secondary">Logout</button>
                        </div>
                    </div>

                    <div className="requests-section">
                        <h2>Your Project Briefs</h2>
                        {requests.length === 0 ? (
                            <div className="no-data">
                                <p>You haven't submitted any project briefs yet.</p>
                                <Link to="/book-a-demo" className="btn btn-primary">Start a Project</Link>
                            </div>
                        ) : (
                            <div className="requests-grid">
                                {requests.map(req => (
                                    <div key={req.id} className="request-card">
                                        <div className="request-header">
                                            <h3>{req.interest}</h3>
                                            <span className={`status-badge ${req.status}`}>{req.status}</span>
                                        </div>
                                        <div className="request-body">
                                            <p><strong>Tracking ID:</strong> <code>{req.id}</code></p>
                                            <p><strong>Submitted:</strong> {req.timestamp?.toDate().toLocaleDateString()}</p>
                                            {req.interestSubcategory && (
                                                <p><strong>Subcategory:</strong> {req.interestSubcategory}</p>
                                            )}
                                            <p><strong>Timeline:</strong> {req.timeline}</p>
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
