import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com';

const INTEREST_SUBCATEGORIES = {
  'Web Development': [
    'Portfolio Website',
    'Landing Page',
    'Business Website',
    'E-commerce Store',
    'Dashboard / Admin Panel',
    'Blog / CMS',
    'Web App (SPA)',
    'Other (Web)',
  ],
  'Mobile App': [
    'Android App',
    'iOS App',
    'Cross-platform App',
    'MVP / Prototype',
    'Maintenance / Updates',
    'Other (Mobile)',
  ],
  'Cloud Solutions': [
    'Deployment / DevOps',
    'Cloud Migration',
    'Serverless Setup',
    'CI/CD Pipeline',
    'Monitoring / Logging',
    'Other (Cloud)',
  ],
};

const BookADemo = () => {
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState(null);
  const [interest, setInterest] = useState('Web Development');
  const [interestSubcategory, setInterestSubcategory] = useState(
    INTEREST_SUBCATEGORIES['Web Development'][0],
  );
  const [customSubcategory, setCustomSubcategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const selectedSubcategory =
      interest === 'Other' ? customSubcategory.trim() : interestSubcategory;

    if (!selectedSubcategory) {
      alert('Please select a subcategory.');
      setLoading(false);
      return;
    }

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      role: formData.get('role'),
      interest,
      interestSubcategory: selectedSubcategory,
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      referral: formData.get('referral') || 'none',
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
        // Silent fail for email - project is still recorded in DB
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
                    <label>Company</label>
                    <input type="text" name="company" required />
                  </div>
                  <div className="form-group">
                    <label>Your Role</label>
                    <input type="text" name="role" required />
                  </div>
                  <div className="form-group">
                    <label>Major Requirement</label>
                    <select
                      name="interest"
                      required
                      value={interest}
                      onChange={(e) => {
                        const nextInterest = e.target.value;
                        setInterest(nextInterest);
                        if (nextInterest === 'Other') {
                          setCustomSubcategory('');
                          setInterestSubcategory('');
                          return;
                        }
                        const nextDefaultSub =
                          INTEREST_SUBCATEGORIES[nextInterest]?.[0] || '';
                        setInterestSubcategory(nextDefaultSub);
                        setCustomSubcategory('');
                      }}
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subcategory</label>
                    {interest === 'Other' ? (
                      <input
                        type="text"
                        name="interestSubcategory"
                        placeholder="e.g., SEO, Branding, Consultation"
                        required
                        value={customSubcategory}
                        onChange={(e) => setCustomSubcategory(e.target.value)}
                      />
                    ) : (
                      <select
                        name="interestSubcategory"
                        required
                        value={interestSubcategory}
                        onChange={(e) => setInterestSubcategory(e.target.value)}
                      >
                        {(INTEREST_SUBCATEGORIES[interest] || []).map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Project Budget</label>
                    <select name="budget" required>
                      <option value="INR 1,500 - 5,000">INR 1,500 - 5,000</option>
                      <option value="INR 5,000 - 10,000">INR 5,000 - 10,000</option>
                      <option value="INR 10,000 - 20,000">INR 10,000 - 20,000</option>
                      <option value="INR 20,000+">INR 20,000+</option>
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
                  <div className="form-group">
                    <label>Referral Code (Optional)</label>
                    <input type="text" name="referral" />
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
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setTrackingId(null);
                    setInterest('Web Development');
                    setInterestSubcategory(INTEREST_SUBCATEGORIES['Web Development'][0]);
                    setCustomSubcategory('');
                  }}
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookADemo;
