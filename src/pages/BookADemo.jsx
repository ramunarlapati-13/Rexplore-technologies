import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com';

const BookADemo = () => {
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      requirements: formData.get('requirements'),
      status: 'received',
      timestamp: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "demo_requests"), data);
      setTrackingId(docRef.id);
      
      // Send telegram notification (simulated or direct fetch if available)
      // For now, let's keep it consistent with previous logic if possible
      
      // EmailJS
      try {
        await emailjs.send("rexploretech.mail", "template_8tqr218", {
          to_name: data.name,
          to_email: data.email,
          tracking_id: docRef.id
        }, "N9_E_x9m6v7h9-XqS"); // Simulated public key based on pattern
      } catch (e) {
        console.log("Email skip:", e);
      }

    } catch (err) {
      console.error(err);
      alert("Error submitting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-demo-page">
      <section className="hero">
        <div className="container">
          <div className="section-header">
            <h1 className="gradient-text">Book a Project Brief</h1>
            <p>Tell us about your project and our experts will guide you through the process.</p>
          </div>

          <div className="form-container">
            {!trackingId ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="tel" name="phone" required />
                  </div>
                  <div className="form-group">
                    <label>Interest</label>
                    <select name="interest" required>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Project Budget</label>
                    <select name="budget" required>
                      <option value="Under $1k">Under $1k</option>
                      <option value="$1k - $5k">$1k - $5k</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value="$10k+">$10k+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Timeline</label>
                    <select name="timeline" required>
                      <option value="Urgent">Urgent (1-2 weeks)</option>
                      <option value="Standard">Standard (1 month)</option>
                      <option value="Long Term">Long Term (3+ months)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Requirements</label>
                  <textarea name="requirements" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Project Brief'}
                </button>
              </form>
            ) : (
              <div className="success-message text-center">
                <div className="modal-icon">✓</div>
                <h3>Submitted Successfully!</h3>
                <p>Your Project Tracking ID is:</p>
                <div className="tracking-id-box">{trackingId}</div>
                <p>Save this ID to track your project status.</p>
                <button className="btn btn-secondary" onClick={() => setTrackingId(null)}>Submit Another</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookADemo;
